<template>
  <div class="wrapper">
    <div class="input-container" v-if="!this.stage">
      <table-input
        :table="table"
        @reset="table = newTable()"
        :allow_infinity="allow_infinity"
      />
      <div class="control-buttons">
        <UIButton
          @click="start"
          @contextmenu.prevent="copyInputToClipboard({ table: table })"
          >Start</UIButton
        >
      </div>
    </div>
    <template v-else>
      <multi-table
        v-if="multi_table"
        :algorithm="algorithm"
        @new="this.stage--"
        :row_headers="true"
      />
      <single-table
        v-else
        :algorithm="algorithm"
        @new="this.stage--"
        :row_headers="true"
      />
    </template>
  </div>
</template>

<script>
import TableInput from "@/components/input/TableInput.vue";
import { Table, TableItem, Tooltip, Highlight } from "@/lib";
import { fractionObjectZero } from "@/lib/utils";
import { NODE_VAR_NAMES } from "@/algorithms";
import UIButton from "@/components/ui/UIButton.vue";
import SingleTable from "@/components/SingleTable.vue";
import MultiTable from "@/components/MultiTable.vue";
import { exampleObj } from "@/lib";
import { copyInputToClipboard } from "@/lib";

export default {
  components: { TableInput, UIButton, SingleTable, MultiTable },
  props: {
    allow_infinity: {
      default: false,
    },
    multi_table: {
      default: false,
    },
    algorithmClass: {},
  },
  async created() {
    const { example } = this.$route.query;
    const { input } = await exampleObj(
      example,
      this.$route.path.split("/").slice(-1)[0]
    );
    if (input) this.table.rows = input.table.rows;
  },
  data() {
    return {
      table: this.newTable(),
      algorithm: null,
      stage: 0,
      copyInputToClipboard: copyInputToClipboard,
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
      this.algorithm = new this.algorithmClass(this.processTable());
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
