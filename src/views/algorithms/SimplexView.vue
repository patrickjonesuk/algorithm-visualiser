<template>
  <div v-if="!stage">
    <simplex-input ref="input" :state="state" @start="start" />
  </div>
  <SingleTable v-else @new="stage--" :algorithm="simplex" />
</template>

<script>
import SingleTable from "@/components/SingleTable.vue";
import SimplexInput from "@/components/input/SimplexInput.vue";
import { SimplexAlgorithm, SimplexInputState } from "@/algorithms";
export default {
  components: { SingleTable, SimplexInput },
  data() {
    return {
      stage: 0,
      state: new SimplexInputState(),
      simplex: null,
    };
  },
  methods: {
    start() {
      this.state.processInputs();
      this.simplex = new SimplexAlgorithm(
        this.state.num_vars,
        this.state.objective,
        this.state.inequalities
      );
      this.stage++;
    },
  },
};
</script>

<style></style>
