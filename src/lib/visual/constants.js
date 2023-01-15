import { Colour } from "./highlights";

export const HighlightColour = {
  // PRIMARY: Colour.none(),
  PRIMARY: new Colour("#8be9fd", 1),
  // SECONDARY: Colour.none(),
  SECONDARY: new Colour("#50fa7b", 1),
  INFO: new Colour("#bd93f9", 0.8),

  SUCCESS: Colour.none(),
  FAILURE: Colour.none(),
};

export const Animation = {
  List: {
    ANIMATE_LEFT: "item-animate-left",
    ANIMATE_RIGHT: "item-animate-right",
  },
};
