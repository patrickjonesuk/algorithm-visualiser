import { OperationItem } from "@/lib/models";

export class TableItem extends OperationItem {}

export class Table {
  /**
   * @param {TableItem[][]} rows
   */
  constructor(rows) {
    this.rows = rows;
  }

  static empty() {
    return new Table([]);
  }

  copyValues() {
    return new Table(
      this.rows.map((row) => row.map(({ value }) => TableItem.valueOnly(value)))
    );
  }
}
