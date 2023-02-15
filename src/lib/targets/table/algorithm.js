import { Algorithm } from "@/lib/models";
import { TableItem } from "./step"; // eslint-disable-line no-unused-vars

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
}

export class TableAlgorithm extends Algorithm {
  constructor() {
    super();

    /**
     * @type {Table[][]}
     * @public
     */
    this.tables = [[]];

    /**
     * The state of the first tables before any operations.
     * @type {Table[]}
     */
    this.initial_tables = [Table.empty()];

    /**
     * The index of the set of tables that is currently being used.
     * @type {Number}
     * @public
     */
    this.table_idx = 0;
  }

  /**
   * Get the current tables.
   * @returns {Table[]}
   * @public
   */
  get table() {
    return this.tables[this.table_idx];
  }

  get lastList() {
    return this.tables[this.table_idx - 1];
  }
}

export class SingleTableAlgorithm extends Algorithm {
  constructor() {
    super();

    /**
     * @type {Table[]}
     * @public
     */
    this.tables = [];

    /**
     * The state of the first tables before any operations.
     * @type {Table}
     */
    this.initial_table = Table.empty();

    /**
     * The index of the set of tables that is currently being used.
     * @type {Number}
     * @public
     */
    this.table_idx = 0;
  }

  /**
   * Get the current table.
   * @returns {Table}
   * @public
   */
  get table() {
    return this.tables[this.table_idx];
  }
}
