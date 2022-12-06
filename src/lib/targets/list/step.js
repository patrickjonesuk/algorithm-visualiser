import { Step , Operation } from '@/lib/models';
import { Highlight, Tooltip } from '@/lib/visual';

export class ListItem {

    /**
     * @param {Number} value 
     * @param {Highlight} highlight 
     * @param {Tooltip} tooltip 
     * @param {string} animation
     */
    constructor(value, highlight, tooltip, animation="") {
        this.value = value;
        this.highlight = highlight;
        this.tooltip = tooltip;
        this.animation = animation;

        /**
         * Random ID.
         * @type {Number}
         */
        this.id = Math.random();
    }

    /**
     * Create a list item with only a value, and no additional formatting.
     * @param {Number} value
     * @returns {ListItem}
     */
    static valueOnly(value) {
        return new ListItem(value, Highlight.none(), Tooltip.none());
    }


}

export class ListAlgorithmOperation extends Operation {

    /**
     * @param {ListItem[][]} before 
     * @param {ListItem[][]} after 
     */
    constructor(before, after) {
        super();
    }
}

export class ListAlgorithmStep extends Step {
    /**
     * @param {ListAlgorithmOperation[]} operations 
     */
    constructor(operations) {
        super(operations);
    }
}
