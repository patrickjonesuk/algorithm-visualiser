
export class Colour {
    /**
     * @param {string} rgb_hex 
     * @param {Number} opacity 
     */
    constructor(rgb_hex, opacity) {
        this.rgb_hex = rgb_hex.startsWith("#") ? rgb_hex.slice(1) : rgb_hex;
        this.rgb_hex_string = `#${this.rgb_hex}`;
        this.opacity = opacity;
    }

    /**
     * Returns an empty (null) colour
     * @returns {Colour}
     */
    static none() {
        return new Colour("#000000", 0);
    }
}

export class Border { 
    /**
     * @param {Colour} colour 
     * @param {Number} width 
     */
    constructor(colour, width) {

        this.colour = colour;
        this.width = width;
    }

    /**
     * Returns an empty (null) border
     * @returns {Border}
     */
    static none() {
        return new Border(Colour.none(), 0);
    }
}

export class Highlight {

    /**
     * @param {Colour} fill_colour 
     * @param {Border} border 
     */
    constructor(fill_colour, border) {
        this.fill_colour = fill_colour;
        this.border = border;
    }

    /**
     * Returns an empty (null) highlight
     * @returns {Highlight}
     */
    static none() {
        return new Highlight(Colour.none(), Border.none());
    }
}

export class Tooltip {

    /**
     * @param {string} text 
     * @param {Colour} bg_colour 
     * @param {Border} border 
     */
    constructor(text, bg_colour, border) {
        this.text = text;
        this.bg_colour = bg_colour;
        this.border = border;
    }

    /**
     * Returns an empty (null) tooltip
     * @returns {Tooltip}
     */
    static none() {
        return new Tooltip("", Colour.none(), Border.none());
    }
}
