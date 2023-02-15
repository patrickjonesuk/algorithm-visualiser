import { VARIABLE_NAMES } from "./constants";

/**
 * @enum {Number}
 */
export const InequalityDirection = {
  LTE: 0,
  GTE: 1,
};

/**
 * @prop {Number} s
 * @prop {Number} a
 * @prop {Number[]} i
 */
export class InequalityState {
  constructor() {
    this.s = 0;
    this.a = 0;
    this.i = new Array(VARIABLE_NAMES.length).fill(0);
    this.i_value = 0;
  }
}

export class Inequality {
  /**
   * @param {Number[]} coeffs
   * @param {InequalityDirection} direction
   * @param {Number} value
   */
  constructor(coeffs, direction, value) {
    this.coeffs = coeffs;
    this.direction = direction;
    this.value = value;
    this.s_var = 0;
    this.artificial_var = 0;
  }

  /**
   * @param {InequalityState} state
   */
  withState(state) {
    if (this.direction === InequalityDirection.LTE) {
      this.s_var = ++state.s;
      state.i.push(0);
    } else {
      this.s_var = ++state.s;
      this.artificial_var = ++state.a;
      // I = a1 + a2 = value - x - y + s1
      // minimise I + x + y - s1 = value
      // therefore maximise I - x -y + s1 = -value
      for (let i = 0; i < this.coeffs.length; i++) {
        state.i[i] -= this.coeffs[i];
      }
      state.i.push(1);
      state.i_value -= this.value;
    }
  }
}
