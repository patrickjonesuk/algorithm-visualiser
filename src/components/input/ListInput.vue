<template>
  <input-info />
  <div class="container">
    <NumberInput
      v-for="(input, idx) in inputs"
      :key="idx"
      :style="{ 'grid-column': idx + 1 }"
      class="number-input"
      :value="input"
    />
    <button
      @click="add"
      :style="{ 'grid-column': inputs.length + 1 }"
      class="add-btn"
    >
      +
    </button>
    <button
      @click="() => remove(idx)"
      v-for="(_, idx) in inputs"
      :key="idx"
      :style="{ 'grid-column': idx + 1 }"
      class="remove-btn"
    >
      &#10060;
    </button>
  </div>
  <div class="btn-container">
    <UIButton class="btn" @click="start">start</UIButton>
    <UIButton class="btn" @click="reset">Reset</UIButton>
    <UIButton
      class="btn"
      @click="
        [10, 12, 9, 8, 7, 6, 5, 4, 3, 20, 2, 1, 15, 18].forEach((x) =>
          this.inputs.push({
            fraction: false,
            numerator: x,
            denominator: null,
            value: x,
          })
        );
        this.inputs.shift();
      "
      >Test data</UIButton
    >
  </div>
</template>

<script>
import NumberInput from "./NumberInput.vue";
import UIButton from "../ui/UIButton.vue";
import InputInfo from "@/components/ui/InputInfo.vue";
export default {
  emits: ["start"],
  components: { NumberInput, UIButton, InputInfo },
  props: {
    inputs: {
      default: [
        {
          fraction: false,
          numerator: 0,
          denominator: null,
          value: 0,
        },
      ],
    },
  },
  methods: {
    reset() {
      this.inputs.splice(0, this.inputs.length);
      this.inputs.push([
        {
          fraction: false,
          numerator: 0,
          denominator: null,
          value: 0,
        },
      ]);
    },
    /**
     * @param {Number} idx
     */
    remove(idx) {
      this.inputs.splice(idx, 1);
    },
    add() {
      this.inputs.push({
        fraction: false,
        numerator: 0,
        denominator: null,
        value: 0,
      });
    },
    start() {
      this.$emit("start", this.inputs);
    },
  },
};
</script>

<style scoped>
.container {
  margin: 1rem;
  padding: 1rem;
  border: 0.1rem solid var(--rgbLine);
  display: grid;
  grid-template-columns: repeat(auto-fill, 6rem);
  column-gap: 1rem;
  overflow-x: auto;
}

.number-input {
  grid-row: 1;
  min-width: 15rem;
  margin-bottom: 1rem;
}

.remove-btn {
  grid-row: 2;
}

.add-btn {
  min-width: 6rem;
  grid-row: 1 / 3;
  font-size: xx-large;
}

button {
  background-color: var(--rgbHeader);
  color: inherit;
  border-radius: 0.5rem;
  border-color: var(--rgbLine);
}
.btn-container {
  display: inline;
}
.btn {
  margin: 1rem;
  padding: 0.5rem;
}
.btn:first-child {
  margin-right: 0;
}
</style>
