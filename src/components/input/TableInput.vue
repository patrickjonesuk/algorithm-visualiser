<template>
  <input-info :allow_infinity="allow_infinity" />
  <div class="wrapper">
    <table>
      <thead>
        <tr>
          <th></th>
          <th
            v-for="(item, i) in table.rows[0]"
            :key="item.id"
            class="delete-hover"
            :data-content="item.value"
            @click="removeRow(i)"
          ></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in table.rows.slice(1)" :key="i">
          <th
            class="delete-hover"
            :data-content="row[0].value"
            @click="removeRow(i)"
          ></th>
          <td v-for="(item, ri) in row.slice(1)" :key="item.id">
            <number-input
              v-if="i !== ri"
              :allow_infinity="allow_infinity"
              :value="item.value"
            />
            <span v-else>-</span>
          </td>
        </tr>
      </tbody>
    </table>
    <UIButton class="btn" @click="newRow">+</UIButton>
    <UIButton class="btn" @click="$emit('reset')">Reset</UIButton>
  </div>
</template>

<script>
import { fractionObjectZero, TableItem } from "../../lib";
import UIButton from "../ui/UIButton.vue";
import { NODE_VAR_NAMES } from "@/algorithms";
import NumberInput from "./NumberInput.vue";
import InputInfo from "@/components/ui/InputInfo.vue";
export default {
  components: { UIButton, NumberInput, InputInfo },
  emits: ["reset"],
  props: {
    table: {},
    allow_infinity: {
      default: false,
    },
  },
  methods: {
    newRow() {
      const newVarName = NODE_VAR_NAMES[this.table.rows[0].length];
      this.table.rows.push([
        TableItem.valueOnly(newVarName),
        ...new Array(this.table.rows[0].length + 1)
          .fill()
          .map(fractionObjectZero),
      ]);
      this.table.rows[0].push(TableItem.valueOnly(newVarName));
      this.table.rows
        .slice(1, -1)
        .forEach((row) => row.push(fractionObjectZero()));
    },
    removeRow(i) {
      this.table.rows.slice(1).forEach((row) => row.splice(i + 1, 1));
      this.table.rows[0].splice(i, 1);
      this.table.rows.splice(i + 1, 1);
      this.table.rows[0].forEach((item, i) => (item.value = NODE_VAR_NAMES[i]));
      this.table.rows
        .slice(1)
        .forEach((row, i) => (row[0].value = NODE_VAR_NAMES[i]));
    },
  },
};
</script>

<style scoped>
.wrapper {
  margin: 1rem;
}

table {
  border-collapse: collapse;
  margin-bottom: 1rem;
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

th.delete-hover::before {
  content: attr(data-content);
}
th.delete-hover:hover::before {
  content: "❌";
  color: var(--rgbRed);
}
th {
  min-width: 6ch;
}

.btn {
  min-width: 5rem;
}

td {
  text-align: center;
}
</style>
