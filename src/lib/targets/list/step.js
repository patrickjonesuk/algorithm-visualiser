import { Step, Operation, OperationItem } from "@/lib/models";

/**
 * @extends OperationItem<Number>
 */
export class ListItem extends OperationItem {}

export class ListAlgorithmOperation extends Operation {
  /**
   * @param {ListItem[][]} before
   * @param {ListItem[][]} after
   */
  constructor(before, after) {
    super();
  }
}

export class ListAlgorithmStep extends Step {
  /**
   * @param {ListAlgorithmOperation[]} operations
   */
  constructor(operations) {
    super(operations);
  }
}
