<script setup>
import BubbleSort from "../components/BubbleSort.vue";
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
  </div>
  <BubbleSort
    v-else
    :numbers="numbers"
    @new="stage = 0"
    :direction="!direction"
  />
</template>

<script>
export default {
  components: [BubbleSort, ListInput, ToggleButton],
  data() {
    return {
      stage: 0,
      direction: 0,
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
