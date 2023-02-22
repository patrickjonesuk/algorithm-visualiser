<script setup>
import { QuickSort, BubbleSort } from "@/algorithms";
import ListSort from "@/components/ListSort.vue";
import ListInput from "@/components/input/ListInput.vue";
import ToggleButton from "@/components/input/ToggleButton.vue";
</script>

<template>
  <div v-if="!stage">
    <ListInput :direction="direction" :inputs="inputs" @start="start" />
    <ToggleButton
      :options="['Ascending', 'Descending']"
      v-model:start_idx="direction"
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
import { exampleObj } from "@/lib";
export default {
  props: ["sortclass"],
  components: [ListSort, ListInput, ToggleButton],
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
  async created() {
    const { example } = this.$route.query;
    const { input } = await exampleObj(
      example,
      this.$route.path.split("/").slice(-1)[0]
    );
    if (input) {
      this.inputs = input.list;
      this.direction = input.direction;
    }
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
