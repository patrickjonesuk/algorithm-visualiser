<template>
  <div v-if="!stage">
    <simplex-input ref="input" :state="state" @start="start" />
  </div>
  <Simplex
    @new="stage--"
    :objective="state.objective"
    :inequalities="state.inequalities"
    :num_vars="state.num_vars"
    v-else
  />
</template>

<script>
import Simplex from "../components/Simplex.vue";
import SimplexInput from "../components/input/SimplexInput.vue";
import { Inequality, SimplexInputState } from "../algorithms";
export default {
  components: { Simplex, SimplexInput },
  data() {
    return {
      stage: 0,
      direction: 0,
      state: new SimplexInputState(),
      objective: [],
      inequalities: [],
      num_vars: 0,
    };
  },
  methods: {
    start() {
      this.state.processInputs();
      this.stage++;
    },
  },
};
</script>

<style></style>
