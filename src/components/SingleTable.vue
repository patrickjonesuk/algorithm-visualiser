<template>
  <algorithm-layout :buttons="buttons" :stats="algorithm.stats">
    <transition-group class="list-of-tables" name="listOfTables" tag="ul">
      <transition-group
        v-for="(table, i) in this.algorithm.tables"
        tag="table"
        :key="i"
        class="table"
      >
        <tbody name="transition-table" :key="'table'">
          <tr v-for="(row, idx) in table.rows" :key="idx">
            <template v-if="idx == 0">
              <th v-if="row_headers"></th>
              <th v-for="item in row" :key="item.id">
                <ToolTip :tooltip="item.tooltip">
                  {{ item.value }}
                </ToolTip>
              </th>
            </template>
            <template v-else>
              <th v-if="row_headers">
                <ToolTip :tooltip="row[0].tooltip">
                  {{ row[0].value }}
                </ToolTip>
              </th>
              <td
                v-for="item in row_headers ? row.slice(1) : row"
                :key="item.id"
                :style="{
                  background: item.highlight.fill_colour.rgb_hex_string,
                  border: item.highlight.border.orDefault(
                    '1px solid var(--rgbLine)'
                  ),
                }"
              >
                <ToolTip :tooltip="item.tooltip">
                  <NumberDisplay :number="item.value" />
                </ToolTip>
              </td>
            </template>
          </tr>
        </tbody>
      </transition-group>
      <div
        v-if="complete"
        key="complete-banner"
        :class="`${algorithm.failed ? 'failure' : 'complete'}-banner`"
      >
        {{ algorithm.end_message }}
      </div>
    </transition-group>
  </algorithm-layout>
</template>

<script>
import NumberDisplay from "./ui/NumberDisplay.vue";
import ControlPanel from "./control/ControlPanel.vue";
import { Level } from "../lib";
import AlgorithmLayout from "./ui/AlgorithmLayout.vue";
import ToolTip from "./ui/ToolTip.vue";

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
  },
};
</script>

<style scoped>
table {
  margin: 1rem;
  border-collapse: collapse;
}

@media only screen and (max-width: 450px) {
  table {
    margin: 0;
  }
}

table,
td,
th {
  border: 1px solid var(--rgbLine);
  padding: 1rem;
}
td {
  background-color: var(--rgbHeader);
  background-clip: padding-box !important;
  transition: all 0.5s;
}

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

table.table {
  margin-bottom: 3rem;
  height: 20px;
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

.list-of-tables {
  overflow-x: scroll;
  padding-left: 0;
}
</style>
