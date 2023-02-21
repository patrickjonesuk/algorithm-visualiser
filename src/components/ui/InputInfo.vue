<template>
  <tool-tip :tooltip="tooltip" class="tooltip">
    <span>&#128712;</span>
  </tool-tip>
</template>

<script>
import ToolTip from "./ToolTip.vue";
import { Border, HighlightColour, Tooltip } from "@/lib";
export default {
  props: {
    allow_infinity: {
      default: false,
    },
  },
  components: { ToolTip },
  computed: {
    tooltip() {
      return new Tooltip(
        "Press '/' to create a fraction" +
          (this.allow_infinity ? "\nPress 'i' to insert ∞" : ""),
        HighlightColour.INFO,
        Border.none()
      );
    },
  },
};
</script>

<style scoped>
.tooltip {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}
.tooltip:hover {
  cursor: pointer;
}
span {
  text-decoration: underline dotted;
  font-size: large;
}
</style>
