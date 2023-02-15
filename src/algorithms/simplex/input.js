import { Inequality } from "./inequalities";

export class SimplexInputState {
  constructor() {

    this.input_inequalities = [];
    this.input_objective = [];

    this.num_vars = 2;

    /** @type {Inequality[]} */
    this.inequalities = [];

    /** @type {Number[]} */
    this.objective = [];
  }

  processInputs() {
    this.inequalities = this.input_inequalities.map(
      (ineq) =>
        new Inequality(
          ineq.coeffs.map(({ value }) => value),
          ineq.direction,
          ineq.value.value
        )
    );
    this.objective = this.input_objective.map(({ value }) => value);
  }
}
