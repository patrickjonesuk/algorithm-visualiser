<template>
  <div class="root">
    <control-panel class="control-panel" :buttons="buttons" :stats="stats" />
    <div class="algorithm-execution">
      <slot />
    </div>
  </div>
</template>

<script>
import ControlPanel from "@/components/control/ControlPanel.vue";
export default {
  components: { ControlPanel },
  props: {
    buttons: {
      default: [],
    },
    stats: {
      default: [],
    },
  },
};
</script>

<style scoped>
.root {
  padding-right: 2rem;
  display: grid;
  grid-template-columns: minmax(150px, max-content) auto;
  inset: 2vh;
  min-height: 86vh;
  overflow: scroll;
}

.control-panel {
  grid-column: 1;
  grid-row: 1 / -1;
  position: sticky;
  height: max-content;
}
.algorithm-execution {
  padding-left: 2.5rem;
  grid-column: 2;
  overflow-y: scroll;
  height: 86vh;
}

@media only screen and (max-width: 450px) {
  .root {
    grid-template-columns: 100%;
    grid-template-rows: minmax(150px, max-content) auto;
  }
  .algorithm-execution {
    padding-left: 0;
    padding-top: 1rem;
    grid-row: 2;
    grid-column: 1;
  }
  .control-panel {
    grid-row: 1;
  }
}
</style>
