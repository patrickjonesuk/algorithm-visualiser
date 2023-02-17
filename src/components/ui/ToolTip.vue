<template>
  <div class="wrapper">
    <div
      :style="cssVars"
      class="tooltip-2"
      :data-text="tooltip.text"
      :data-opacity="opacity"
      @click="toggled = !toggled"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["tooltip"],
  data() {
    return {
      toggled: false,
    };
  },
  computed: {
    opacity() {
      return this.toggled ? 1 : 0;
    },
    cssVars() {
      return {
        "--background-colour": this.tooltip.bg_colour.rgb_hex_string,
        "--border": this.tooltip.border.css_string,
        "--opacity": this.toggled ? 1 : 0,
        "--display": this.tooltip.text === "" ? "hidden" : "visible",
      };
    },
  },
};
</script>

<style scoped>
.tooltip-2 {
  position: relative;
}
.tooltip-2::before,
.tooltip-2::after {
  position: absolute;
  transition: all 0.5s ease;
  margin-left: -100px;
  left: 50%;
  bottom: 200%;
  display: block;
  color: #000;
  visibility: var(--display);
  opacity: var(--opacity);
  pointer-events: none;
}

.tooltip-2::before {
  content: attr(data-text);
  border: var(--border);
  background-color: var(--background-colour);
  border-radius: 6px;
  width: 200px;
  text-align: center;
  z-index: 2;
  padding: 0.2rem;
}

/* .tooltip-2::after { */
/*   content: "\25c6"; */
/*   margin-left: 0; */
/*   margin-top: 10px; */
/*   width: 15px; */
/*   height: 12px; */
/*   z-index: 1; */
/*   color: #0088cc; */
/* } */

.tooltip-2[data-opacity="1"]::before,
.tooltip-2[data-opacity="1"]::after,
.tooltip-2:hover::before,
.tooltip-2:hover::after {
  bottom: 105%;
  opacity: 1;
}
</style>
