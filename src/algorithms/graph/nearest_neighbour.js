import {
  Border,
  Highlight,
  HighlightColour,
  Level,
  SingleTableAlgorithm,
  Table,
  Tooltip,
} from "@/lib";
import { min } from "mathjs";

export class NearestNeighbourAlgorithm extends SingleTableAlgorithm {
  /**
   * @param {Level} level
   */
  step(level) {
    if (level === Level.ALGORITHM || level === Level.ITERATION) {
      while (!this.complete) this.step(Level.OPERATION);
    } else {
      if (this.current_column !== this.next_column) {
        this.current_column = this.next_column;
        this.columns.push(this.current_column);
        if (this.columns.length === this.table.rows[0].length) {
          this.complete = true;
          return;
        }

        this.table.rows
          .slice(1)
          .forEach(
            (row) =>
              (row[this.current_column].highlight = new Highlight(
                HighlightColour.PRIMARY,
                Border.none()
              ))
          );
        if (this.current_column !== 1) {
          this.table.rows
            .slice(1)
            .forEach(
              (row) =>
                (row[this.columns[this.columns.length - 2]].highlight =
                  Highlight.none())
            );
        }

        this.columns.forEach((columnIdx) =>
          this.table.rows[columnIdx].forEach(
            (item) =>
              (item.highlight = new Highlight(
                HighlightColour.DISABLED,
                Border.none()
              ))
          )
        );

        this.table.rows[0][this.current_column - 1].tooltip = new Tooltip(
          `Label: ${this.operations}`,
          HighlightColour.INFO,
          Border.none()
        );
        this.columns
          .slice(1)
          .forEach(
            (columnIdx, i) =>
              (this.table.rows[columnIdx][this.rows[i]].highlight =
                new Highlight(HighlightColour.SUCCESS, Border.none()))
          );
      } else {
        const column = this.table.rows
          .slice(1)
          .map((row) => row[this.current_column]);
        const available = column.filter(
          (_, i) => !this.columns.includes(i + 1)
        );
        const minValue = min(available.map((item) => item.value));

        const itemId = available.find((item) => item.value === minValue).id;

        const idx = column.findIndex((item) => item.id === itemId) + 1;

        this.next_column = idx;
        this.rows.push(this.current_column);
        this.table.rows[idx][this.current_column].highlight = new Highlight(
          HighlightColour.SUCCESS,
          Border.none()
        );
        this.table.rows[idx][this.current_column].tooltip = new Tooltip(
          "Smallest available value in column",
          HighlightColour.INFO,
          Border.none()
        );
        this.table.rows[0][idx - 1].tooltip = new Tooltip(
          `Label: ${++this.operations}`,
          HighlightColour.INFO,
          Border.none()
        );
      }
    }
  }

  /**
   * @param {Table} initial_table
   */
  constructor(initial_table) {
    super();

    /** @type {Number[]} */
    this.columns = [];
    /** @Type {Number[]} */
    this.rows = [];

    /** @Type {Number} */
    this.current_column = 0;
    /** @Type {Number} */
    this.next_column = 1;
    this.operations = 1;

    this.initial_table = initial_table.copyValues();
    this.reset();
  }

  reset() {
    this.tables = [this.initial_table.copyValues()];
    this.columns = [];
    this.current_column = 0;
    this.next_column = 1;
    this.operations = 1;
    this.complete = false;
  }
}
