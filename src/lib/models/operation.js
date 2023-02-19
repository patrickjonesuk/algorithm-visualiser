import { Highlight, Tooltip } from "@/lib/visual";

/**
 * @template T
 */
export class OperationItem {
  /**
   * @param {T} value
   * @param {Highlight} highlight
   * @param {Tooltip} tooltip
   */
  constructor(value, highlight, tooltip) {
    this.value = value;
    this.highlight = highlight;
    this.tooltip = tooltip;

    /**
     * Random ID.
     * @type {Number}
     */
    this.id = Math.random();
  }

  /**
   * Create a list item with only a value, and no additional formatting.
   * @template T
   * @param {T} value
   * @returns {OperationItem<T>}
   */
  static valueOnly(value) {
    return new OperationItem(value, Highlight.none(), Tooltip.none());
  }

  static nan() {
    return OperationItem.valueOnly(NaN);
  }
}
