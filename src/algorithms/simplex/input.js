import { SimplexObjective, VARIABLE_NAMES } from "./constants";
import { Inequality } from "./inequalities";

export class SimplexInputState {
  constructor() {
    this.input_inequalities = [];
    this.input_objective = [];
    /** @type {Number} */
    this.big_m = 0;

    /**
     * @type {SimplexObjective}
     */
    this.minmax = SimplexObjective.MAXIMISE;

    this.num_vars = 2;

    /** @type {Inequality[]} */
    this.inequalities = [];

    /** @type {Number[]} */
    this.objective = [];
  }
}

export function printExample(state) {
  processInputs(state);
  const parts = [];
  const coeff_str = (coeffs) =>
    coeffs
      .slice(0, state.num_vars)
      .map((v, i) =>
        v === 0
          ? ""
          : `${i > 0 && (v > 0 || v.s) ? " + " : ""}${
              Math.abs(v) === 1 ? "" : v
            }${VARIABLE_NAMES[i]}`
      )
      .join("");
  const obj_string = coeff_str(state.objective);
  parts.push(`${["Maximise", "Minimise"][state.minmax]} P = ${obj_string}`);
  parts.push("Subject to:");
  for (const ineq of state.inequalities) {
    const str = coeff_str(ineq.coeffs);
    parts.push(`${str} ${["≤", "≥"][ineq.direction]} ${ineq.value}`);
  }
  return parts;
}

export function processInputs(state) {
  state.inequalities = state.input_inequalities.map(
    (ineq) =>
      new Inequality(
        ineq.coeffs.map(({ value }) => value),
        ineq.direction,
        ineq.value.value
      )
  );
  state.objective = state.input_objective.map(({ value }) => value);
}
