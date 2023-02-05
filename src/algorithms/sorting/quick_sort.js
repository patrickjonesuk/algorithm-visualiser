import { Direction, ListAlgorithm, ListItem } from "@/lib/targets/list"; // eslint-disable-line no-unused-vars
import {
  Border,
  Colour,
  Highlight,
  HighlightColour,
  Tooltip,
} from "@/lib/visual";
import { byId } from "@/lib";
import { Level } from "@/lib/levels";
import { compare } from "mathjs";

/**
 * @exports
 * @public
 */
export class QuickSort extends ListAlgorithm {
  /**
   * @template T
   * @param {T[]} list
   * @returns {T[]}
   */
  copyList(list) {
    return list.map((item) => Object.assign({}, item));
  }

  /**
   * Compute the entire quicksort algorithm for the inputs,
   * saving every step of the execution to be stepped through
   * by the user.
   *
   * @param {ListItem[]} array
   * @returns {ListItem[]} topArray
   */
  quicksort(array) {
    let arr = [...array];
    let topArrays = [];
    const iterations = [];

    const stack = [];
    const pivotIds = [];
    stack.push([[0, arr.length]]);
    while (stack.length && stack[0].length) {
      const operations = [];
      const new_pivot_ids = [];

      const next_pivot_set = [];
      const pivots = stack.pop();
      for (const [start, end] of pivots) {
        if (end - start < 2) continue;
        const pivotIdx = start + Math.floor((end - start) / 2);
        pivotIds.push(arr[pivotIdx].id);
        new_pivot_ids.push(arr[pivotIdx].id);
        const topArray = this.copyList(arr);
        pivotIds.forEach(
          (id) =>
            (topArray.find(byId(id)).highlight = new Highlight(
              Colour.none(),
              new Border(HighlightColour.PRIMARY, 0.1, "rem")
            ))
        );
        topArray
          .slice(start, end)
          .forEach(
            (item) =>
              (item.highlight = new Highlight(
                HighlightColour.SECONDARY,
                item.highlight.border
              ))
          );
        topArrays.push(topArray);
        const firstOpIdx = operations.length;

        /** @param {ListItem} item */
        const pivotBorder = (item) => {
          if (pivotIds.includes(item.id)) {
            const newItem = Object.assign({}, item);
            const colour = new_pivot_ids.includes(item.id)
              ? HighlightColour.SECONDARY
              : HighlightColour.PRIMARY;
            newItem.highlight = new Highlight(
              newItem.highlight.fill_colour,
              new Border(colour, 0.1, "rem")
            );
            newItem.tooltip = new Tooltip(
              "Previous pivot",
              HighlightColour.INFO,
              Border.none()
            );
            return newItem;
          }
          return item;
        };
        /** @param {ListItem} item */
        const disable = (item) =>
          Object.assign(Object.assign({}, item), {
            highlight: new Highlight(
              HighlightColour.DISABLED,
              item.highlight.border
            ),
          });
        const before = arr.slice(0, start).map(pivotBorder).map(disable);
        const after = arr.slice(end, -1).map(pivotBorder).map(disable);
        operations.push([[...before, ...arr.slice(start, end), ...after]]);
        const [newPivotIdx, newArr] = this.partition(
          arr,
          pivotIdx,
          start,
          end,
          operations,
          before,
          after
        );
        operations[firstOpIdx].push(topArray);
        arr.splice(start, end - start, ...newArr);
        next_pivot_set.push([newPivotIdx + 1, end], [start, newPivotIdx]);
      }

      stack.push(next_pivot_set);
      if (operations.length) iterations.push(operations);
    }

    topArrays.push(arr);
    this.complete_list = arr;
    this.all_operations = iterations;
    return topArrays[0];
  }

  /**
   * Sort a section of an array about the pivot,
   * and record all intermediate states.
   *
   * @param {ListItem[]} array
   * @param {Number} pivotIdx
   * @param {Number} low
   * @param {Number} high
   * @param {ListItem[][][]} operations
   * @param {ListItem[]} before
   * @param {ListItem[]} after
   * @returns {[Number, ListItem[]]}
   */
  partition(array, pivotIdx, low, high, operations, before, after) {
    const arr = this.copyList(array);
    const pivotValue = arr[pivotIdx];
    pivotValue.highlight = new Highlight(
      HighlightColour.PRIMARY,
      Border.none()
    );
    pivotValue.tooltip = new Tooltip(
      "Pivot item",
      HighlightColour.INFO,
      Border.none()
    );
    const lhs = [];
    const rhs = [];
    const inArr =
      (arrIn = arr) =>
      /** @param {Number} idx */
      (idx) =>
        arrIn[idx];
    for (let i = low; i < high; i++) {
      if (i === pivotIdx) {
        continue;
      }
      const delta = compare(arr[i].value, pivotValue.value);
      if (delta > 0 === this.direction) rhs.push(i);
      else lhs.push(i);
      [
        { list: lhs, msg: "Place to left of pivot" },
        { list: rhs, msg: "Place to right of pivot" },
      ].forEach(({ list, msg }) =>
        list.forEach(
          (idx) =>
            (inArr()(idx).tooltip = new Tooltip(
              msg,
              HighlightColour.INFO,
              Border.none()
            ))
        )
      );
      operations.push([
        [
          ...before,
          ...this.padList(
            lhs.map(inArr()),
            rhs.map(inArr()),
            pivotValue,
            high - low
          ),
          ...after,
        ],
      ]);
    }
    const newArr = [
      ...lhs.map(inArr(array)),
      array[pivotIdx],
      ...rhs.map(inArr(array)),
    ];
    return [low + lhs.length, newArr];
  }

  /**
   * Step through the pre-computed execution of the algorithm.
   *
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
    if (level === Level.OPERATION) {
      if (
        this.operation_idx === this.all_operations[this.list_idx - 1].length
      ) {
        this.list_idx++;
        this.operation_idx = 0;
        if (this.list_idx - 1 === this.all_operations.length) {
          this.complete = true;
          this.lists.push(this.complete_list);
          return;
        }
      }
      const next = this.all_operations[this.list_idx - 1][this.operation_idx++];
      if (next.length === 2) this.lists[0] = next[1];
      this.lists[this.list_idx] = next[0];
    }
  }

  /**
   * @param {Direction} direction
   */
  constructor(direction) {
    super();

    this.direction = direction;

    /**
     * The list of all operations that have been pre-computed.
     * This is a list of iterations, where each iteration is a list of operations.
     * Each operation is a list of up to two elements.
     * The first (and always present) element is the state of the current list.
     * The second (and optional) element is the state of the header list.
     * @see {@link lists}
     *
     * @type {ListItem[][][][]}
     */
    this.all_operations = [];

    /**
     * The index of the current operation within the current iteration.
     *
     * @type {Number}
     */
    this.iteration_idx = 0;
    /**
     * The index of the current iteration of the algorithm.
     *
     * @type {Number}
     */
    this.operation_idx = 1;
    /**
     * The final state of the list of numbers, in the correct order
     * and without formatting.
     *
     * @type {ListItem[]}
     */
    this.complete_list = [];
  }

  /**
   * @param {ListItem[]} lhs
   * @param {ListItem[]} rhs
   * @param {ListItem} pivot
   * @param {Number} size
   * @returns {ListItem[]}
   */
  padList(lhs, rhs, pivot, size) {
    const pad_size = size - lhs.length - rhs.length - 1;
    if (pad_size === 0) return [...lhs, pivot, ...rhs];
    if (pad_size < 0) return [];
    let pad_before, pad_after;
    if (lhs.length >= Math.floor(size / 2)) {
      pad_before = 0;
      pad_after = pad_size;
    } else if (rhs.length >= Math.floor(size / 2)) {
      pad_after = 0;
      pad_before = pad_size;
    } else {
      pad_before = Math.floor(size / 2) - lhs.length;
      pad_after = pad_size - pad_before;
    }
    const padding_before = new Array(pad_before).fill(ListItem.nan());
    const padding_after = new Array(pad_after).fill(ListItem.nan());
    return [...lhs, ...padding_before, pivot, ...padding_after, ...rhs];
  }

  /**
   * @param {Number[]} numbers
   */
  data(numbers) {
    this.lists[0] = numbers.map(ListItem.valueOnly);
    this.start_list = this.copyList(this.lists[0]);
    const copied_list = this.copyList(this.start_list);
    this.list_idx = 1;
    const topArray = this.quicksort(this.start_list);
    this.lists[0] = topArray;
    this.lists.push(copied_list);
  }
}
