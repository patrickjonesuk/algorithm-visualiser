
<template>

<div class="tooltip">
    <slot></slot>
    <span :style="cssVars" v-if="tooltip.text !== ''" class="tooltip-text">{{tooltip.text}}</span>
    <i></i>
</div>
  
</template>

<script>
export default {
    props: ['tooltip'],
   computed: {
       cssVars() {
           return {
               "--background-colour": this.tooltip.bg_colour.rgb_hex_string,
           }
       }
   }

}
</script>

<style>

.tooltip {
    position: relative;
    display: inline-block;
}
.tooltip .tooltip-text {
    opacity: 0;
    min-width: 120px;
    max-width: 100%;

    transform: translate(-50%, -100%);
    background-color: var(--background-colour);
    color: #fff;
    text-align: center;
    border-radius: 6px;

    position: absolute;
    z-index: 1;
    transition: opacity .3s;
}
.tooltip:hover .tooltip-text {
    opacity: 1;
}
.tooltip .tooltip-text::after {
  content: " ";
  position: absolute;
  top: 100%; /* At the bottom of the tooltip */
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: black transparent transparent transparent;
}

</style>
