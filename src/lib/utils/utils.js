import { TableItem } from "@/lib/targets";

export function byId(id, prop = "id") {
  return (item) => item[prop] === id;
}

/**
 * @returns {TableItem}
 */
export function fractionObjectZero() {
  return TableItem.valueOnly({
    numerator: 0,
    denominator: null,
    value: 0,
    fraction: false,
  });
}
