import { Algorithm } from "@/lib/models";
import { OperationItem } from "@/lib/models";

/**
 * @extends OperationItem<Number>
 */
export class ListItem extends OperationItem {}

export class ListAlgorithm extends Algorithm {
  constructor() {
    super();

    /**
     * the list of numbers being sorted, in their current order.
     * @type {ListItem[][]}
     * @public
     */
    this.lists = [[]];

    /**
     * The state of the first list before any operations.
     * @type {ListItem[]}
     */
    this.start_list = [];

    /**
     * The index of the list that is currently being used.
     * @type {Number}
     * @public
     */
    this.list_idx = 0;
  }

  /**
   * Get the current list.
   * @returns {ListItem[]}
   * @public
   */
  get list() {
    return this.lists[this.list_idx];
  }

  get lastList() {
    return this.lists[this.list_idx - 1];
  }
}
