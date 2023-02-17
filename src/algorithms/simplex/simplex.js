import {
  Border,
  Highlight,
  HighlightColour,
  Level,
  SingleTableAlgorithm,
  Table,
  TableItem,
  Tooltip,
} from "@/lib";
import {
  A_VAR_PREFIX,
  MAX_ITERATIONS,
  OBJ_FUNC_VAR_NAME,
  OP_COL_NAME,
  ROW_OP_PLACEHOLDER,
  S_VAR_PREFIX,
  THETA_COL_NAME,
  TS_S1_OBJ_FUNC_NAME,
  VALUE_COL_NAME,
  VARIABLE_NAMES,
} from "./constants";
import { Inequality, InequalityState } from "./inequalities";
import { create, all } from "mathjs";
import { SimplexInputState } from "./input";

export class SimplexAlgorithm extends SingleTableAlgorithm {
  /**
   * @param {Level} level
   */
  step(level) {
    if (level === Level.ALGORITHM) {
      let i = 1;
      while (!this.complete && i++ <= MAX_ITERATIONS)
        this.step(Level.ITERATION);
      if (i >= MAX_ITERATIONS) {
        this.complete = true;
        this.failed = true;
        this.end_message = "Maximum iterations exceeded without solution.";
      }
    } else if (level === Level.ITERATION) {
      const startTableIdx = this.table_idx;
      while (startTableIdx === this.table_idx && !this.complete)
        this.step(Level.OPERATION);
    } else if (level === Level.OPERATION) {
      if (this.pivot_column_idx === -1) {
        const obj_row = this.row(-1);
        const min_value = this.math.min(
          ...obj_row.slice(1, -3).map((item) => item.value)
        );

        this.pivot_column_idx = obj_row.findIndex(
          (item) => item.value === min_value
        );
        obj_row[this.pivot_column_idx].highlight = new Highlight(
          HighlightColour.PRIMARY,
          Border.none()
        );
        obj_row[this.pivot_column_idx].tooltip = new Tooltip(
          "Smallest negative coefficient in objective row",
          HighlightColour.INFO,
          Border.none()
        );
      } else if (this.pivot_row_idx === -1) {
        const thetas = [];
        for (const row of this.table.rows.slice(1, -1)) {
          const a = row[row.length - 3].value;
          const theta = this.divideToFraction(
            a,
            row[this.pivot_column_idx].value
          );
          thetas.push(theta);
          row[row.length - 2].value = theta;
        }
        const minTheta = this.math.min(
          ...thetas.filter((x) => this.math.isPositive(x) && x != Infinity)
        );
        this.pivot_row_idx = thetas.findIndex((x) => x === minTheta) + 1;
        const pivotRow = this.row(this.pivot_row_idx);
        pivotRow.forEach(
          (item) => (item.highlight.fill_colour = HighlightColour.PRIMARY)
        );
        pivotRow[pivotRow.length - 2].tooltip = new Tooltip(
          "Smallest positive θ-value",
          HighlightColour.INFO,
          Border.none()
        );
      } else if (this.operation_row_idx === -1) {
        this.operation_row_idx = 0;
        const pivotRow = this.row(this.pivot_row_idx);
        const valueToOne = pivotRow[this.pivot_column_idx].value;
        const scalar = this.divideToFraction(1, valueToOne);
        pivotRow[pivotRow.length - 1].value = `R${
          this.pivot_row_idx
        }' -> ||${this.math.format(scalar)}|| R${this.pivot_row_idx}`;
        pivotRow[pivotRow.length - 1].tooltip = new Tooltip(
          "Multiply row by scalar to make pivot coefficient equal 1",
          HighlightColour.INFO,
          Border.none()
        );
        for (const column of pivotRow.slice(1, -2)) {
          const oldValue = column.value;
          const newValue = this.multiplyToFraction(column.value, scalar);
          column.value = newValue;
          column.tooltip = new Tooltip(
            `${oldValue} × ${scalar} = ${newValue}`,
            HighlightColour.INFO,
            Border.none()
          );
        }
      } else {
        const pivotRow = this.row(this.pivot_row_idx);
        const prevRow = this.row(this.operation_row_idx);

        while (++this.operation_row_idx === this.pivot_row_idx);
        if (this.operation_row_idx === this.table.rows.length)
          return this.nextIteration();

        prevRow.forEach((item) => (item.highlight = Highlight.none()));
        const thisRow = this.row(this.operation_row_idx);
        const valueToZero = thisRow[this.pivot_column_idx].value;
        const scalar = this.divideToFraction(
          this.math.abs(valueToZero),
          pivotRow[this.pivot_column_idx].value
        );
        const add = this.math.isNegative(valueToZero);
        thisRow[thisRow.length - 1].value = `R${this.operation_row_idx}' -> R${
          this.operation_row_idx
        } ${add ? "+" : "-"} ||${scalar}|| R${this.pivot_row_idx}'`;
        thisRow[thisRow.length - 1].tooltip = new Tooltip(
          "Add scalar multiple of pivot row to make pivot coefficient equal 0",
          HighlightColour.INFO,
          Border.none()
        );
        const slice = pivotRow.slice(1, -2);
        for (let i = 1; i <= slice.length; i++) {
          const offset = this.multiplyToFraction(pivotRow[i].value, scalar);
          const oldValue = thisRow[i].value;
          thisRow[i].highlight = new Highlight(
            HighlightColour.SECONDARY,
            Border.none()
          );
          const newValue = this.binaryOperationToFraction(
            oldValue,
            offset,
            add ? this.math.add : this.math.subtract
          );
          thisRow[i].value = newValue;
          thisRow[i].tooltip = new Tooltip(
            `${oldValue} ${add ? "+" : "-"} ${scalar} × ${
              pivotRow[i].value
            } = ${newValue}`,
            HighlightColour.INFO,
            Border.none()
          );
        }
      }
    }
  }

  nextIteration() {
    const newValue = this.table.rows[0][this.pivot_column_idx].value;
    this.row(this.pivot_row_idx)[0].highlight = new Highlight(
      HighlightColour.SUCCESS,
      Border.none()
    );
    this.row(this.pivot_row_idx)[0].tooltip = new Tooltip(
      `${newValue} is now a basic variable`,
      HighlightColour.INFO,
      Border.none()
    );
    this.row(this.pivot_row_idx)[0].value = newValue;

    const table = new Table(
      this.table.rows.map((row) =>
        row.map(
          (item) => new TableItem(item.value, Highlight.none(), Tooltip.none())
        )
      )
    );
    table.rows.slice(1).forEach((row) => (row[row.length - 1].value = "")); // clear theta-values
    table.rows.slice(1).forEach((row) => (row[row.length - 2].value = "")); // clear row operations

    const min_value = this.math.min(
      ...this.row(-1)
        .slice(1, -3)
        .map((item) => item.value)
    );
    if (this.math.largerEq(min_value, 0)) {
      if (this.two_stage && this.stage === 1) {
        this.stage++;
        const iRow = this.row(-1);
        if (!this.math.equal(iRow[iRow.length - 3].value, 0)) {
          this.complete = true;
          this.failed = true;
          this.end_message =
            "A feasible solution has not been reached after the first stage";
          return;
        }
        table.rows.splice(table.rows.length - 1, 1);
        table.rows.forEach((row) =>
          row.splice(
            this.num_vars + this.inequality_state.s + 1,
            this.inequality_state.a
          )
        );
      } else {
        this.complete = true;
        return;
      }
    }

    this.tables.push(table);
    this.table_idx++;
    this.pivot_row_idx = -1;
    this.operation_row_idx = -1;
    this.pivot_column_idx = -1;
    this.iterations++;
  }

  get stats() {
    const stats = { Iterations: this.iterations, Version: "standard" };
    if (this.two_stage)
      Object.assign(stats, { Version: "Two stage", Stage: this.stage });
    return stats;
  }

  /**
   * @param {Number} num_vars
   * @param {Number[]} objective
   * @param {Inequality[]} inequalities
   */
  constructor(num_vars, objective, inequalities) {
    super();

    this.math = create(all, {
      number: "Fraction",
    });

    /** @type {InequalityState} */
    this.inequality_state = new InequalityState();

    this.num_vars = num_vars;
    this.objective = objective
      .slice(0, num_vars)
      .map((x) => this.multiplyToFraction(x, -1)); // Change from P=ax+by to P-ax-by=0
    this.inequalities = inequalities;
    this.inequalities.forEach(
      (ineq) => (ineq.coeffs = ineq.coeffs.slice(0, num_vars))
    );
    inequalities.forEach((x) => x.withState(this.inequality_state));
    this.inequality_state.i.splice(num_vars, VARIABLE_NAMES.length - num_vars);

    /** @type {boolean} */
    this.two_stage = this.inequality_state.a !== 0;

    /** @type {Number} */
    this.stage = 1;

    /**
     * The index of the column of the pivot element, chosen as the smallest
     * negative number in the objective function row.
     * Indexed such that 0 indicates the 'B.V.' column.
     *
     * A value of -1 indicates that a pivot has not yet been determined
     * for the current iteration.
     *
     * @type {Number}
     */
    this.pivot_column_idx = -1;

    /**
     * The index of the row being used to produce a non-slack basic variable,
     * chosen as the row with the smallest theta-value for the pivot column.
     * Indexed such that 0 indicates the first (header) row of the table.
     *
     * A value of -1 indicates that a pivot row not yet been determined
     * for the current iteration.
     *
     * @type {Number}
     */
    this.pivot_row_idx = -1;

    /**
     * The index of the row currently being operated on.
     * Indexed such that 0 indicates the row of the first (header) row.
     *
     * A value of -1 indicates that no row has yet undergone any change
     * during the current iteration.
     *
     * @type {Number}
     */
    this.operation_row_idx = -1;

    /** @param {string} text */
    const text_style = (text) =>
      new TableItem(text, Highlight.none(), Tooltip.none());
    const zero = () => new TableItem(0, Highlight.none(), Tooltip.none());

    this.header_row = [text_style("B.V.")]
      .concat(
        new Array(this.num_vars)
          .fill()
          .map((_, i) => text_style(VARIABLE_NAMES[i]))
      )
      .concat(
        new Array(this.inequality_state.s)
          .fill()
          .map((_, i) => text_style(`${S_VAR_PREFIX}${i}`))
      )
      .concat(
        new Array(this.inequality_state.a)
          .fill()
          .map((_, i) => text_style(`${A_VAR_PREFIX}${i}`))
      )
      .concat([VALUE_COL_NAME, THETA_COL_NAME, OP_COL_NAME].map(text_style));

    this.header_column = new Array(this.inequality_state.s)
      .fill()
      .map((_, i) => text_style(`${S_VAR_PREFIX}${i}`));

    const artificial_var_rows = this.header_column.map((_, i) =>
      this.inequalities[i].artificial_var
        ? [
            ...new Array(this.inequalities[i].artificial_var - 1)
              .fill()
              .map(zero),
            TableItem.valueOnly(1),
            ...new Array(
              this.inequality_state.a - this.inequalities[i].artificial_var
            )
              .fill()
              .map(zero),
          ]
        : new Array(this.inequality_state.a).fill().map(zero)
    );

    const ineq_rows = this.header_column.map((bv, i) => [
      bv,
      ...this.inequalities[i].coeffs.map(TableItem.valueOnly),
      ...new Array(this.inequalities[i].s_var - 1).fill().map(zero),
      TableItem.valueOnly(this.inequalities[i].artificial_var ? -1 : 1),
      ...new Array(this.inequality_state.s - this.inequalities[i].s_var)
        .fill()
        .map(zero),
      ...artificial_var_rows[i],

      TableItem.valueOnly(this.inequalities[i].value),
      zero(), // theta-value
      text_style(ROW_OP_PLACEHOLDER),
    ]);

    const obj_row = [
      text_style(OBJ_FUNC_VAR_NAME),
      ...this.objective.map(TableItem.valueOnly),
      ...new Array(this.inequality_state.s).fill().map(zero),
      ...new Array(this.inequality_state.a).fill().map(zero),
      TableItem.valueOnly(0),
      zero(), // theta-value
      text_style(ROW_OP_PLACEHOLDER),
    ];
    const i_row = this.two_stage
      ? [
          [
            text_style(TS_S1_OBJ_FUNC_NAME),
            ...this.inequality_state.i.map(TableItem.valueOnly),
            ...new Array(this.inequality_state.a).fill().map(zero),
            TableItem.valueOnly(this.inequality_state.i_value),
            zero(), // theta-value
            text_style(ROW_OP_PLACEHOLDER),
          ],
        ]
      : [];

    this.initial_table = new Table([
      this.header_row,
      ...ineq_rows,
      obj_row,
      ...i_row,
    ]);
    this.tables = [this.initial_table];
  }

  /**
   * @param {Number} index
   * @returns {TableItem[]}
   */
  row(index) {
    return this.table.rows[
      (this.table.rows.length + index) % this.table.rows.length
    ];
  }

  /**
   * @param {Number} a
   * @param {Number} b
   * @returns {Number}
   */
  divideToFraction(a, b) {
    if (b === 0) return Infinity;
    return this.binaryOperationToFraction(a, b, this.math.divide);
  }

  /**
   * @param {Number} a
   * @param {Number} b
   * @returns {Number}
   */
  multiplyToFraction(a, b) {
    return this.binaryOperationToFraction(a, b, this.math.multiply);
  }

  /**
   * @param {Number} a
   * @param {Number} b
   * @param {Function} operation
   * @returns {Number}
   */
  binaryOperationToFraction(a, b, operation) {
    const result = operation(a, b);
    if (this.math.isInteger(result) || this.math.equal(result, 0))
      return this.math.number(result);
    // @ts-ignore mathjs type system uses a strange mix of {MathType} and {number | Fraction}
    // meaning that while this is completely type-safe, typescript will insist that it's not.
    return this.math.fraction(result);
  }

  reset() {
    this.tables = [this.initial_table.copyValues()];
    this.stage = 1;
    this.operations = 0;
    this.iterations = 0;
    this.table_idx = 0;
    this.complete = false;
    this.failed = false;
    this.pivot_row_idx = -1;
    this.pivot_column_idx = -1;
    this.operation_row_idx = -1;
  }
}
