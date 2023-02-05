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
  }

  setup() {}

  /**
   * @param {Number} level
   */
  step(level) {}
}
