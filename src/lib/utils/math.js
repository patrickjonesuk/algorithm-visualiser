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
