import {Colour} from "./highlights";

export const HighlightColour = {
    // PRIMARY: Colour.none(),
    PRIMARY: new Colour("#0000ff", 1),
    // SECONDARY: Colour.none(),
    SECONDARY: new Colour("#00ff00", 1),
    INFO: new Colour("#32a852", 0.8),

    SUCCESS: Colour.none(),
    FAILURE: Colour.none(),

}

export const Animation = {
    List: {
        ANIMATE_LEFT: "item-animate-left",
        ANIMATE_RIGHT: "item-animate-right",
    },
};

