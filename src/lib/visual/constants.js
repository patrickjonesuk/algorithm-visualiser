import { Colour } from "./highlights";

export const HighlightColour = {
  PRIMARY: new Colour("#8be9fd", 1), // Dracula Cyan
  SECONDARY: new Colour("#f1fa8c", 1), // Dracula Yellow

  INFO: new Colour("#bd93f9", 0.8), // Dracula Purple
  DISABLED: new Colour("#44475a", 1), // Dracula 'Current line'

  SUCCESS: new Colour("#50fa7b", 1), // Dracula Green
  WARNING: new Colour("#ffb86c", 1), // Dracula Orange
  FAILURE: new Colour("#ff5555", 1), // Dracula Red
};

export const Animation = {
  List: {
    ANIMATE_LEFT: "item-animate-left",
    ANIMATE_RIGHT: "item-animate-right",
  },
};
