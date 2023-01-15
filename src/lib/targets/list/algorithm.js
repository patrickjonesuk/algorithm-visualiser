import { Algorithm } from "@/lib/models";
import { ListItem } from "./step";

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
     * The index of the list that is currently being used.
     * @type {Number}
     * @public
     */
    this.list_idx = 0;
  }
}
