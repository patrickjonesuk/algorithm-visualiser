<template>
  <div class="wrapper">
    <div class="input-container" v-if="!this.stage">
      <table-input :table="table" @reset="table = newTable()" />
      <div class="control-buttons">
        <UIButton @click="start">Start</UIButton>
      </div>
    </div>
    <SingleTable
      v-else
      :algorithm="prim"
      @new="this.stage--"
      :row_headers="true"
    />
  </div>
</template>

<script>
import TableInput from "@/components/input/TableInput.vue";
import { Table, TableItem, Tooltip, Highlight } from "@/lib";
import { fractionObjectZero } from "@/lib/utils";
import { NODE_VAR_NAMES, PrimsAlgorithm } from "@/algorithms";
import UIButton from "@/components/ui/UIButton.vue";
import SingleTable from "@/components/SingleTable.vue";
export default {
  components: { TableInput, UIButton, SingleTable },
  data() {
    return {
      table: this.newTable(),
      prim: null,
      stage: 0,
    };
  },
  methods: {
    newTable() {
      const header = NODE_VAR_NAMES.slice(0, 4).map(
        (letter) => new TableItem(letter, Highlight.none(), Tooltip.none())
      );
      const valueRows = header.map((letter) => [
        letter,
        ...header.map(fractionObjectZero),
      ]);
      return new Table([header, ...valueRows]);
    },
    processTable() {
      const newTable = this.table.copyValues();
      newTable.rows
        .slice(1)
        .forEach((row) =>
          row.slice(1).forEach((item) => (item.value = item.value.value))
        );
      newTable.rows.slice(1).forEach((row, i) => (row[i + 1].value = "-"));
      return newTable;
    },
    start() {
      this.prim = new PrimsAlgorithm(this.processTable());
      this.stage++;
    },
  },
};
</script>

<style scoped>
.control-buttons {
  margin-left: 1rem;
}
</style>
