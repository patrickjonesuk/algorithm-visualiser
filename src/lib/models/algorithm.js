/**
 * @abstract
 */
export class Algorithm {
  /**
   * @property {Number} operations;
   * @property {Number} iterations;
   * @property {boolean} complete;
   */
  constructor() {
    this.operations = 0;
    this.iterations = 0;
    this.complete = false;
    this.failed = false;
    this.end_message = "Algorithm complete";
  }

  setup() {}

  /**
   * @param {Number} level
   */
  step(level) {}
}
