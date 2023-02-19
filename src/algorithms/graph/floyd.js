import {
  binaryOperationToFraction,
  Border,
  Highlight,
  HighlightColour,
  Level,
  Table,
  TableAlgorithm,
  TableItem,
  Tooltip,
} from "@/lib";
import { create, all } from "mathjs";

export class FloydsAlgorithm extends TableAlgorithm {
  /**
   * @param {Level} level
   */
  step(level) {
    if (level === Level.ALGORITHM) {
      while (!this.complete) this.step(Level.ITERATION);
      return;
    } else if (level === Level.ITERATION) {
      const start_idx = this.table_idx;
      while (this.table_idx === start_idx) this.step(Level.OPERATION);
      return;
    } else {
      if (this.row === -1) {
        this.cells = [];
        this.row = 0;
        this.column = 0;
        const newTable = this.table.map((table) => table.copyValues());
        if (this.table[0].rows[0].length <= ++this.table_idx) {
          this.complete = true;
          return;
        }
        this.tables.push(newTable);
        return;
      }
      if (this.row === 0) {
        while (this.row++ === this.table_idx);
        this.selectNextCell();
        this.table[0].rows[this.table_idx + 1].forEach(
          (item) =>
            (item.highlight = new Highlight(
              HighlightColour.PRIMARY,
              Border.none()
            ))
        );
        this.table[0].rows
          .slice(1)
          .forEach(
            (row) =>
              (row[this.table_idx + 1].highlight = new Highlight(
                HighlightColour.PRIMARY,
                Border.none()
              ))
          );
        return;
      }
      if (this.calculate_update) {
        const { value } = this.table[0].rows[this.row][this.column];
        const a = this.table[0].rows[this.row][this.table_idx + 1].value;
        const b = this.table[0].rows[this.table_idx + 1][this.column].value;
        let swap = false;
        if (a !== Infinity && b !== Infinity) {
          const sum = binaryOperationToFraction(a, b, this.math.add, this.math);
          // @ts-ignore this function is marked as returning
          // { boolean | MathCollection }, presumably because the authors
          // didn't want to write a different function declaration for matrices.
          if (value === Infinity || this.math.smaller(sum, value)) {
            swap = true;
            this.swaps++;
            const cell = (i = 0) => this.table[i].rows[this.row][this.column];
            cell().value = sum;
            cell(1).value = this.table[0].rows[0][this.table_idx].value;
            [cell(), cell(1)].forEach(
              (item) =>
                (item.highlight = new Highlight(
                  HighlightColour.SUCCESS,
                  Border.none()
                ))
            );
            cell().tooltip = new Tooltip(
              `(${a} + ${b}) < ${value}`,
              HighlightColour.INFO,
              Border.none()
            );
            cell(1).tooltip = new Tooltip(
              `Route through ${cell(1).value} to get from ${
                this.table[0].rows[this.row][0].value
              } to ${this.table[0].rows[0][this.column - 1].value}`,
              HighlightColour.INFO,
              Border.none()
            );
          }
        }
        this.selectNextCell();
        this.calculate_update = false;
        if (!swap && this.row !== -1) {
          this.displayNextCell();
          this.calculate_update = true;
        }
      } else {
        this.displayNextCell();
      }
    }
  }

  displayNextCell() {
    if (this.cells.length > 1) {
      const [row, column] = this.cells[this.cells.length - 2];
      this.table[0].rows[row][column].highlight = Highlight.none();
    }
    this.table[0].rows[this.row][this.column].highlight = new Highlight(
      HighlightColour.SECONDARY,
      Border.none()
    );
    this.calculate_update = true;
  }

  selectNextCell() {
    do {
      while (this.column++ === this.table_idx);
      if (this.column > this.table[0].rows[0].length) {
        while (this.row++ === this.table_idx);
        this.column = 0;
        while (this.column++ === this.table_idx);
      }
      if (this.row > this.table[0].rows[0].length) {
        this.row = -1;
        return;
      }
    } while (this.row === this.column);
    this.cells.push([this.row, this.column]);
  }

  /**
   * @param {Table} initial_table
   */
  constructor(initial_table) {
    super();

    /** @type {import("mathjs").MathJsStatic} */
    this.math = create(all, {
      number: "Fraction",
    });

    const row = () =>
      initial_table.rows[0].map(({ value }) => TableItem.valueOnly(value));
    const intitial_route_table = new Table([
      row(),
      ...initial_table.rows[0].map(({ value }) => [
        TableItem.valueOnly(value),
        ...row(),
      ]),
    ]);

    this.initial_tables = [initial_table, intitial_route_table];
    this.tables = [this.initial_tables.map((table) => table.copyValues())];
    /**
     * The row of the current cell being considered,
     * indexed such that 0 would indicate the header row.
     * @type {Number}
     */
    this.row = 0;
    /**
     * The column of the current cell being considered,
     * indexed such that 0 would indicate the header column.
     * @type {Number}
     */
    this.column = 0;
    /**
     * An array of the cells that have been considered during the current iteration,
     * in the order of their consideration.
     * @type {Number[][]}
     */
    this.cells = [];
    /**
     * @type {boolean}
     */
    this.calculate_update = false;
    /**
     * @type {Number}
     */
    this.swaps = 0;
  }

  reset() {
    this.tables = [this.initial_tables.map((table) => table.copyValues())];
    this.row = 0;
    this.column = 0;
    this.cells = [];
    this.table_idx = 0;
    this.calculate_update = false;
    this.complete = false;
    this.swaps = 0;
  }

  get stats() {
    const stats = {
      Iterations: this.table_idx,
      Swaps: this.swaps,
      Complete: this.complete,
    };
    return stats;
  }
}
