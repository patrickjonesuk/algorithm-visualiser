<script setup>
import { QuickSort, BubbleSort } from "../algorithms";
import ListSort from "../components/ListSort.vue";
import ListInput from "../components/input/ListInput.vue";
import ToggleButton from "../components/input/ToggleButton.vue";
</script>

<template>
  <div v-if="!stage">
    <ListInput :inputs="inputs" @start="start" />
    <ToggleButton
      :options="['ascending', 'descending']"
      v-model:start_idx="direction"
    />
    <ToggleButton
      :options="['Bubble Sort', 'Quick Sort']"
      v-model:start_idx="sortclass"
    />
  </div>
  <ListSort
    v-else
    :numbers="numbers"
    @new="stage = 0"
    :direction="!direction"
    :sortclass="[BubbleSort, QuickSort][sortclass]"
  />
</template>

<script>
export default {
  components: [ListSort, ListInput, ToggleButton],
  data() {
    return {
      stage: 0,
      direction: 0,
      sortclass: 0,
      inputs: [
        {
          fraction: false,
          numerator: 0,
          denominator: null,
          value: 0,
        },
      ],
    };
  },
  computed: {
    numbers() {
      return this.inputs.map(({ value }) => value);
    },
  },
  methods: {
    /**
     * @param {Array} numbers
     */
    start(numbers) {
      this.numbers = numbers;
      this.stage = 1;
    },
  },
};
</script>
