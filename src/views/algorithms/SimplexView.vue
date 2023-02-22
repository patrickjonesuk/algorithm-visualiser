<template>
  <div v-if="!stage">
    <simplex-input :state="state" @start="start" />
  </div>
  <SingleTable v-else @new="stage--" :algorithm="simplex" />
</template>

<script>
import SingleTable from "@/components/SingleTable.vue";
import SimplexInput from "@/components/input/SimplexInput.vue";
import {
  SimplexAlgorithm,
  SimplexInputState,
  processInputs,
} from "@/algorithms";
import { exampleObj } from "@/lib";
export default {
  components: { SingleTable, SimplexInput },
  async created() {
    const { example } = this.$route.query;
    const { input } = await exampleObj(example, "simplex");
    if (input) this.state = input.state;
  },
  data() {
    return {
      stage: 0,
      state: new SimplexInputState(),
      simplex: null,
    };
  },
  methods: {
    start() {
      processInputs(this.state);
      this.simplex = new SimplexAlgorithm(
        this.state.num_vars,
        this.state.objective,
        this.state.inequalities,
        this.state.minmax,
        !!this.state.big_m
      );
      this.stage++;
    },
  },
};
</script>

<style></style>
