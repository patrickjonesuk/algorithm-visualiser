<template>
  <input-info />
  <div class="wrapper">
    Variables: <UIButton @click="state.num_vars++">+</UIButton>
    <UIButton @click="state.num_vars > 0 ? state.num_vars-- : {}">-</UIButton>
    <div class="objective-wrapper">
      <ToggleButton
        :options="['Maximise', 'Minimise']"
        v-model:start_idx="state.minmax"
      />
      <span> P = </span>
      <div class="coeff" v-for="(vname, i) in varNames" :key="vname">
        <NumberInput class="num-input" :value="state.input_objective[i]" />{{
          vname
        }}{{ i < varNames.length - 1 ? " +" : "" }}
      </div>
    </div>
    <hr />
    <div class="ineq-wrapper">
      <div class="ineq" v-for="(x, i) in state.input_inequalities" :key="i">
        <div class="coeff" v-for="(vname, idx) in varNames" :key="vname">
          <NumberInput class="num-input" :value="x.coeffs[idx]" /> {{ vname
          }}{{ idx < varNames.length - 1 ? " +" : "" }}
        </div>
        <ToggleButton
          class="lt-gt"
          :options="['≤', '≥']"
          v-model:start_idx="x.direction"
        ></ToggleButton>
        <NumberInput class="num-input" :value="x.value" />
        <UIButton @click="state.input_inequalities.splice(i, 1)"
          >&#10060;</UIButton
        >
      </div>
    </div>
    <UIButton style="margin-bottom: 1rem; width: 5rem" @click="newIneq()"
      >+</UIButton
    >
    <br />
    <ToggleButton
      v-if="state.input_inequalities.some((ineq) => ineq.direction === 1)"
      style="margin-bottom: 1rem; min-width: 5rem"
      :options="['Two stage', 'Big-M']"
      v-model:start_idx="state.big_m"
    />
    <hr />
    <UIButton
      class="uibtn"
      @contextmenu.prevent="copyToClipboard"
      @click="this.$emit('start')"
      >Start</UIButton
    >
    <UIButton
      class="uibtn"
      @click="
        state.input_inequalities.length = 0;
        state.num_vars = 2;
        state.input_objective = createCoeffs();
      "
      >Reset</UIButton
    >
  </div>
</template>

<script>
import { copyInputToClipboard } from "@/lib";
import UIButton from "@/components/ui/UIButton.vue";
import {
  Inequality,
  InequalityDirection,
  VARIABLE_NAMES,
} from "../../algorithms";
import NumberInput from "./NumberInput.vue";
import ToggleButton from "./ToggleButton.vue";
import InputInfo from "@/components/ui/InputInfo.vue";
import { printExample } from "@/algorithms";
export default {
  components: { UIButton, NumberInput, ToggleButton, InputInfo },
  emits: ["start"],
  props: ["state"],
  data() {
    return {};
  },
  computed: {
    varNames() {
      return VARIABLE_NAMES.filter((_, i) => i < this.state.num_vars);
    },
  },
  methods: {
    copyToClipboard() {
      copyInputToClipboard(
        { state: this.state },
        { display: true, description: printExample(this.state).join("<br>") }
      );
    },
    zero() {
      return { numerator: 0, denominator: null, value: 0, fraction: false };
    },
    newIneq() {
      this.state.input_inequalities.push(
        new Inequality(
          // @ts-ignore This is not strictly type-safe, but these values are always
          // converted to actual numerical types before any mathematical operations are performed.
          VARIABLE_NAMES.map(this.zero),
          InequalityDirection.LTE,
          this.zero()
        )
      );
    },
    createCoeffs() {
      return new Array(VARIABLE_NAMES.length).fill().map((_) => ({
        numerator: 0,
        denominator: null,
        value: 0,
        fraction: false,
      }));
    },
  },
  created() {
    this.VARIABLE_NAMES = VARIABLE_NAMES;
    if (this.state.input_objective.length === 0)
      this.state.input_objective = this.createCoeffs();
  },
};
</script>

<style scoped>
hr {
  width: 100%;
  margin-bottom: 1rem;
}

.ineq-wrapper {
  padding-top: 0rem;
}
.ineq:first-child {
  padding-top: 0rem;
}

.wrapper {
  margin: 2rem;
}
.objective-wrapper,
.ineq {
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
}
.coeff {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-right: 1rem;
  white-space: pre;
}
.num-input {
  padding-right: 1rem;
}

.lt-gt {
  margin-left: 1rem;
}
.uibtn {
  margin-top: 0.5rem;
}
</style>
