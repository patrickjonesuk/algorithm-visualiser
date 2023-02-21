<template>
  <algorithm-layout :buttons="buttons" :stats="algorithm.stats">
    <transition-group class="list-of-tables" name="listOfTables" tag="ul">
      <li class="tables" v-for="(tables, i) in this.algorithm.tables" :key="i">
        <algorithm-table
          v-for="(table, i) in tables"
          :key="i"
          class="table"
          :table="table"
          :row_headers="row_headers"
        />
      </li>
    </transition-group>
    <Transition>
      <div
        v-if="complete"
        key="complete-banner"
        :class="`${algorithm.failed ? 'failure' : 'complete'}-banner`"
      >
        {{ algorithm.end_message }}
      </div>
    </Transition>
  </algorithm-layout>
</template>

<script>
import NumberDisplay from "./ui/NumberDisplay.vue";
import ControlPanel from "./control/ControlPanel.vue";
import { Level } from "../lib";
import AlgorithmLayout from "./ui/AlgorithmLayout.vue";
import ToolTip from "./ui/ToolTip.vue";
import AlgorithmTable from "./ui/AlgorithmTable.vue";

export default {
  props: {
    algorithm: {},
    row_headers: {
      default: false,
    },
  },
  computed: {
    buttons() {
      return [
        {
          func: () => this.algorithm.step(Level.OPERATION),
          label: "step",
          bind: {
            disabled: this.complete,
          },
        },
        {
          func: () => this.algorithm.step(Level.ITERATION),
          label: "iteration",
          bind: {
            disabled: this.complete,
          },
        },
        {
          func: () => this.algorithm.step(Level.ALGORITHM),
          label: "complete",
          bind: {
            disabled: this.complete,
          },
        },
        {
          func: () => this.algorithm.reset(),
          label: "reset",
          bind: {},
        },
        {
          func: () => this.$emit("new"),
          label: "new",
          bind: {},
        },
      ];
    },
    complete() {
      return this.algorithm.complete;
    },
  },
  components: {
    NumberDisplay,
    ControlPanel,
    AlgorithmLayout,
    ToolTip,
    AlgorithmTable,
  },
};
</script>

<style scoped>
.listOfTables-enter-from {
  transform: translateY(-100%);
}

.listOfTables-enter-active {
  transition: all 1s;
}

.listOfTables-leave-active {
  display: none;
  transition: all 0s;
}

.listOfTables-move {
  transition: all 1s;
}

.listOfTables-enter-from.complete-banner {
  transform: translateY(-100%);
}
.complete-banner,
.failure-banner {
  text-align: center;
  margin: 0.5rem;
  border: 0.1rem solid var(--rgbGreen);
  transition: all 0.5s;
  padding: 1rem;
}
.complete-banner {
  border-color: var(--rgbGreen);
}
.failure-banner {
  border-color: var(--rgbRed);
}

.tables {
  display: flex;
  justify-content: start;
}
.table:not(:last-child) {
  margin-right: 3rem;
}

.list-of-tables {
  overflow-x: scroll;
  padding-left: 0;
}
.v-enter-from {
  transform: translateY(-500%);
}
</style>
