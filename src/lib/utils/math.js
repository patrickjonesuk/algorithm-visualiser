/**
 * @param {Number} a
 * @param {Number} b
 * @param {import("mathjs").MathJsStatic} math
 * @returns {Number}
 */
export function divideToFraction(a, b, math) {
  if (b === 0) return Infinity;
  return binaryOperationToFraction(a, b, math.divide, math);
}

/**
 * @param {Number} a
 * @param {Number} b
 * @param {import("mathjs").MathJsStatic} math
 * @returns {Number}
 */
export function multiplyToFraction(a, b, math) {
  return binaryOperationToFraction(a, b, math.multiply, math);
}

/**
 * @param {Number} a
 * @param {Number} b
 * @param {Function} operation
 * @param {import("mathjs").MathJsStatic} math
 * @returns {Number}
 */
export function binaryOperationToFraction(a, b, operation, math) {
  const result = operation(a, b);
  if (math.isInteger(result) || math.equal(result, 0))
    return math.number(result);
  // @ts-ignore mathjs type system uses a strange mix of {MathType} and {number | Fraction}
  // meaning that while this is completely type-safe, typescript will insist that it's not.
  return math.fraction(result);
}

export class MExpression {
  /**
   * @param {Number} constant
   * @param {Number} m
   * @param {import("mathjs").MathJsStatic} math
   */
  constructor(constant, m, math) {
    this.constant = constant;
    this.m = m;
    this.math = math;
    this.is_mexpr = true;
  }

  /**
   * @param {Number} scalar
   * @returns {MExpression}
   */
  multiplyScalar(scalar) {
    return new MExpression(
      multiplyToFraction(this.constant, scalar, this.math),
      multiplyToFraction(this.m, scalar, this.math),
      this.math
    );
  }

  /**
   * @param {MExpression} expr
   * @returns {MExpression}
   */
  addExpr(expr) {
    return new MExpression(
      binaryOperationToFraction(
        this.constant,
        expr.constant,
        this.math.add,
        this.math
      ),
      binaryOperationToFraction(this.m, expr.m, this.math.add, this.math),
      this.math
    );
  }

  toString() {
    // TODO: simplifiy by factorisation
    const part1 = !this.math.equal(this.constant, 0)
      ? `||${this.math.format(this.constant)}||`
      : "";
    const part2 = !this.math.equal(this.m, 0)
      ? `${
          !this.math.equal(this.math.abs(this.m), 1)
            ? `||${this.math.format(this.math.abs(this.m))}||`
            : ""
        }M`
      : "";
    const sign =
      part2 && this.math.isNegative(this.m)
        ? " - "
        : part1 && part2
        ? " + "
        : "";
    return `${part1}${sign}${part2}` || "0";
  }

  /**
   * @param {MExpression} other
   * @returns {boolean}
   */
  isLessThan(other) {
    if (this.math.equal(this.m, other.m)) {
      // @ts-ignore why is there not a separate definition for matrices?
      return this.math.smaller(this.constant, other.constant);
    }
    // @ts-ignore
    return this.math.smaller(this.m, other.m);
  }

  /**
   * @returns {boolean}
   */
  isPositiveZero() {
    /** @ts-ignore @see isLessThan */
    if (this.math.equal(this.m, 0)) return this.math.largerEq(this.constant, 0);
    return this.math.isPositive(this.m)
  }

  /**
   * @param {import("mathjs").MathJsStatic} math
   * @returns {MExpression}
   */
  static zero(math) {
    return new MExpression(0, 0, math);
  }
}
