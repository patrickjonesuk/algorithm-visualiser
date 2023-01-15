<template>
  <div
    :style="cssVars"
    class="tooltip-2"
    :data-text="tooltip.text"
    @click="toggled = !toggled"
  >
    <slot></slot>

    <!--
<div class="tooltip-container" @click="toggled = !toggled">
<div class="tooltip">
    <slot></slot>
    <span :style="cssVars"  v-if="tooltip.text !== ''" class="tooltip-text">{{tooltip.text}}</span>
    <i></i>
</div>
</div>
-->
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
    cssVars() {
      return {
        "--background-colour": this.tooltip.bg_colour.rgb_hex_string,
        "--opacity": this.toggled ? 1 : 0,
        "--display": this.tooltip.text === "" ? "none" : "block",
      };
    },
  },
};
</script>

<style>
.tooltip-2 {
  position: relative;
}
.tooltip-2::before {
  content: attr(data-text);
  position: absolute;
  z-index: 1;
  background-color: var(--background-colour);
  transform: translate(-50%, -100%);
  transition: opacity 0.25s;
  /* transform: translateX(-50%); */
  top: 0;

  left: 50%;
  padding: 0.2rem;
  border-radius: 6px;

  text-align: center;
  opacity: var(--opacity);
  display: var(--display);
}
.tooltip-2:hover:before {
  opacity: 1;
}
.tooltip-2::after {
  opacity: var(--opacity);
  display: var(--display);
  content: " ";
  position: absolute;
  top: 0;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: black transparent transparent transparent;
  transition: opacity 0.25s;
}
.tooltip-2:hover:after {
  opacity: 1;
}
</style>
