<template>
  <transition-group tag="table" class="table">
    <tbody name="transition-table" :key="'table'">
      <tr v-for="(row, idx) in table.rows" :key="idx">
        <template v-if="idx == 0">
          <th v-if="row_headers"></th>
          <th v-for="item in row" :key="item.id">
            <ToolTip class="tooltip" :tooltip="item.tooltip">
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
</template>

<script>
import ToolTip from "./ToolTip.vue";
import NumberDisplay from "./NumberDisplay.vue";
export default {
  components: { NumberDisplay, ToolTip },
  props: ["table", "row_headers"],
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
table.table {
  margin-bottom: 3rem;
  height: 20px;
}
.tooltip {
  text-align: center;
}
</style>
