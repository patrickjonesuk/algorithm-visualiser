import { Step, Operation, OperationItem } from "@/lib/models";

export class TableItem extends OperationItem {}

export class TableAlgorithmOperation extends Operation {
  /**
   * @param {TableItem[][]} before
   * @param {TableItem[][]} after
   */
  constructor(before, after) {
    super();
  }
}

export class TableAlgorithmStep extends Step {
  /**
   * @param {TableAlgorithmOperation[]} operations
   */
  constructor(operations) {
    super(operations);
  }
}
