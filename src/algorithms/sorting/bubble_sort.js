import {
  Direction, // eslint-disable-line no-unused-vars
  ListAlgorithm,
  ListAlgorithmOperation,
  ListItem,
} from "@/lib/targets/list";
import {
  Animation,
  Border,
  Highlight,
  HighlightColour,
  Tooltip,
} from "@/lib/visual";
import { Level } from "@/lib/levels";
import { compare } from "mathjs";

/**
 * @exports
 * @public
 * @class
 * @constructor
 */
export class BubbleSort extends ListAlgorithm {
  /**
   * @param {Level} level
   */
  step(level) {
    if (level === Level.ALGORITHM) {
      while (!this.complete) this.step(Level.ITERATION);
    } else if (level === Level.ITERATION) {
      const start_idx = this.list_idx;
      while (start_idx === this.list_idx && !this.complete)
        this.step(Level.OPERATION);
    }
    if (this.idx === this.list.length - 1) {
      if (this.swaps === 0) {
        this.complete = true;
        return;
      }
      this.lists.push(
        this.list.map(
          (item) => new ListItem(item.value, Highlight.none(), Tooltip.none())
        )
      );
      this.list_idx++;
      this.iterations++;
      this.idx = 0;
      this.swaps = 0;
    }
    const { comparing } = this;
    if (!comparing) {
      if (this.idx !== 0) {
        this.list[this.idx - 1].highlight = Highlight.none();
        this.list[this.idx - 1].tooltip = Tooltip.none();
      }
      [0, 1].forEach(
        (idx) =>
          (this.list[this.idx + idx].highlight = new Highlight(
            HighlightColour.PRIMARY,
            Border.none()
          ))
      );
      [0, 1].forEach(
        (idx) =>
          (this.list[this.idx + idx].tooltip = new Tooltip(
            "Comparing with other item",
            HighlightColour.INFO,
            Border.none()
          ))
      );
      this.comparing = true;
    }
    if (level > Level.OPERATION || comparing) this.comparePair();
  }

  /**
   * @returns {ListAlgorithmOperation}
   */
  comparePair() {
    this.operations++;
    const [a, b] = [this.list[this.idx], this.list[this.idx + 1]];
    // const delta = a.value - b.value;
    const delta = compare(a.value, b.value);
    const oldList = this.copyLists();
    this.list.forEach((item) => {
      item.tooltip = Tooltip.none();
      item.highlight = Highlight.none();
    });
    if (delta > 0 === this.direction) {
      const [newA, newB] = [a, b].map((item, idx) => {
        item.highlight = new Highlight(HighlightColour.SUCCESS, Border.none());
        item.tooltip = new Tooltip(
          "Items in wrong order, swapping",
          HighlightColour.INFO,
          Border.none()
        );
        return item;
      });
      this.list[this.idx++] = newB;
      this.list[this.idx] = newA;
      this.swaps++;
    } else {
      this.idx++;
    }
    this.comparing = false;
    return new ListAlgorithmOperation(oldList, this.lists);
  }

  /**
   * @returns {ListItem[][]}
   */
  copyLists() {
    return this.lists.map((list) => list.slice());
  }

  /**
   * @param {Direction} direction
   */
  constructor(direction) {
    super();

    this.direction = direction;

    /**
     * the index of the first number of the next pair to compare.
     * @type {Number}
     * @public
     */
    this.idx = 0;

    /**
     * the number of full passes completed.
     * @type {Number}
     * @public
     */
    this.num_passes = 0;

    /** @type {boolean} */
    this.comparing = false;

    /** @type {Number} */
    this.swaps = 0;
  }

  /**
   * @param {Number[]} numbers
   */
  data(numbers) {
    this.lists[0] = numbers.map(ListItem.valueOnly);
  }
}
