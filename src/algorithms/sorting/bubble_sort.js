
import { ListAlgorithm, ListAlgorithmOperation, ListAlgorithmStep, ListItem } from '@/lib/targets/list';
import { InputContainer, InputType } from '@/lib/input';
import { Animation, Border, Highlight, HighlightColour, Tooltip } from '@/lib/visual';
import {Level} from '@/lib/levels';

/**
 * @exports
 * @public
 * @class
 * @constructor
 */
export class BubbleSort extends ListAlgorithm {

    /**
     * @param {Number} level 
     * @returns {ListAlgorithmStep}
     */
    step(level) {
        const operations = [];
        if (level === Level.ITERATION) {
            const start_idx = this.list_idx;
            while (start_idx === this.list_idx && !this.complete) operations.push(...this.step(Level.CALCULATION).operations);
            return new ListAlgorithmStep(operations);
        }
        if (this.idx === this.list.length - 1) {
            if (this.swaps === 0) {
                this.complete = true;
                return new ListAlgorithmStep([]);
            }
            const oldLists = this.lists.slice();
            // this.lists.push(this.list.slice());
            this.lists.push(this.list.map(item =>
                new ListItem(item.value, Highlight.none(), Tooltip.none(), "")
            ));
            this.list_idx++;
            this.idx = 0;
            this.swaps = 0;
            return new ListAlgorithmStep([new ListAlgorithmOperation(oldLists, this.lists)])
        }
        const { comparing } = this;
        if (!comparing) {
            const oldList = this.copyLists();
            if (this.idx !== 0) {
                this.list[this.idx-1].highlight = Highlight.none();
                this.list[this.idx-1].animation = "";
            }
            [0, 1].forEach((idx) => this.list[this.idx + idx].highlight = new Highlight(HighlightColour.PRIMARY, Border.none()));
            [0, 1].forEach((idx) => this.list[this.idx + idx].animation = "");
            [0, 1].forEach((idx) => this.list[this.idx + idx].tooltip = new Tooltip("Comparing with other item", HighlightColour.INFO, Border.none()));
            this.comparing = true;
            operations.push(new ListAlgorithmOperation(oldList, this.lists));
        }
        if (level > Level.CALCULATION || comparing)
            operations.push(this.comparePair());


        return new ListAlgorithmStep(operations);
    }

    /**
     * @returns {ListAlgorithmOperation}
     */
    comparePair() {
        const [a, b] = [this.list[this.idx], this.list[this.idx+1]]
        const delta = a.value - b.value;
        const oldList = this.copyLists();
        this.list.forEach(item => {
            item.tooltip = Tooltip.none();
            item.highlight = Highlight.none();
            item.animation = "";
        });
        if ((delta > 0) === this.direction) {
            const [newA, newB] = [a, b].map((item, idx) => {
                item.highlight = new Highlight(HighlightColour.SECONDARY, Border.none());
                item.tooltip = new Tooltip("Items in wrong order, swapping", HighlightColour.INFO, Border.none());
                item.animation = Animation.List[`ANIMATE_${['RIGHT', 'LEFT'][idx]}`];
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
     * Get the current list.
     * @returns {ListItem[]}
     */
    get list() {
        return this.lists[this.list_idx];
    }

    /**
     * @returns {ListItem[][]}
     */
    copyLists() {
        return this.lists.map(list => list.slice());
    }


    /**
     * @param {boolean} direction 
     */
    constructor(direction) {
        super(new InputContainer(InputType.NUMBER, 
            2, Infinity, 1, 1))

        this.direction = direction

        /**
         * the list of numbers being sorted, in their current order.
         * @type {ListItem[][]}
         * @public
         */
        this.lists = [[]];

        /**
         * The index of the list that is currently being used.
         * @type {Number}
         * @public
         */
        this.list_idx = 0;

        /**
         * The index of the first number of the next pair to compare.
         * @type {Number}
         * @public
         */
        this.idx = 0;

        /**
         * The number of full passes completed.
         * @type {Number}
         * @public
         */
        this.num_passes = 0;

        /** @type {boolean} */
        this.comparing = false;

        /** @type {Number} */
        this.swaps = 0;

        /** @type {boolean} */
        this.complete = false;

    }

    setup() {
        this.lists[0] = this.inputContainer.data[0].slice().map(ListItem.valueOnly)
    }

}
