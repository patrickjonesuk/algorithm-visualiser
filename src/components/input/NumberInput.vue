<template>
  <div class="fraction-container">
    <input @input="inputNumerator" class="input numerator" ref="numerator" />
    <input
      @keydown="keyDown"
      @input="inputDenominator"
      class="input denominator"
      :style="{ opacity: value.fraction ? 1 : 0 }"
      ref="denominator"
      v-model="value.denominator"
    />
    <hr v-if="value.fraction" />
  </div>
</template>

<script>
import { fraction } from "mathjs";
export default {
  props: ["value"],

  data() {
    return {
      fraction: false,
      numerator: this.value,
      denominator: 0,
    };
  },
  mounted() {
    this.valueWatcher(this.value);
  },
  computed: {
    inputValue() {
      if (this.value === undefined) return 0;
      if (this.value.fraction)
        return fraction(
          `${this.value.numerator || 0}/${Math.max(
            this.value.denominator || 1,
            1
          )}`
        );
      return Number.parseFloat(this.value.numerator) || 0;
    },
  },
  watch: {
    /**
     * @param {Number} _new
     */
    inputValue(_new) {
      this.$emit("input", _new);
      this.value["value"] = _new;
    },
    value(_new) {
      this.valueWatcher(_new);
    },
  },
  methods: {
    valueWatcher(_new) {
      this.$refs.numerator.value = _new.numerator || "";
      this.$refs.denominator.value = _new.denominator || "";
    },
    keyDown(evt) {
      if (
        ["Backspace", "Delete"].includes(evt.key) &&
        evt.target.value === ""
      ) {
        this.value.fraction = false;
        this.$refs.numerator.focus();
        evt.preventDefault();
      }
    },
    inputNumerator(evt) {
      if (evt.inputType === "insertText") {
        /* this.ensureNumberOnly(evt.target, { allow_slash: true }); */
        const lastCharIdx = evt.target.value.length - 1;
        const lastChar = evt.target.value[lastCharIdx];
        const numPoints = evt.target.value.split(".").length - 1;
        if (lastChar === "/") {
          evt.target.value = evt.target.value.slice(0, lastCharIdx);
          if (numPoints === 0 && lastCharIdx > 0) {
            this.value.fraction = true;
            this.$refs.denominator.focus();
          }
          return;
        }
        const matchRe = numPoints == 1 && lastCharIdx > 0 ? /[0-9.]/ : /[0-9]/;
        if (!lastChar.match(matchRe)) {
          evt.target.value = evt.target.value.slice(0, lastCharIdx);
        }
      }
      this.value.numerator = evt.target.value;
    },
    inputDenominator(evt) {
      if (evt.target.value === "") {
        this.value.fraction = false;
        this.$refs.numerator.focus();
      } else if (evt.target.value === "0") {
        evt.target.value = "";
      } else {
        const lastCharIdx = evt.target.value.length - 1;
        const lastChar = evt.target.value[lastCharIdx];
        if (!lastChar.match(/[0-9]/))
          evt.target.value = evt.target.value.slice(0, lastCharIdx);
      }

      /* } else { */
      /*     this.ensureNumberOnly(evt.target) */
      /* } */
      this.value.denominator = evt.target.value;
    },

    ensureNumberOnly(el, { allow_slash = false } = {}) {
      const lastCharIdx = el.value.length - 1;
      const lastChar = el.value[lastCharIdx];
      const penChar = el.value[lastCharIdx - 1];
      const numRe = /[0-9.]/;
      if (allow_slash && lastChar === "/") {
        if (lastCharIdx === 0 || penChar === ".") {
          el.value = el.value.slice(0, lastCharIdx);
        }
      } else if (
        (lastCharIdx === 0 && lastChar === ".") ||
        !lastChar.match(numRe) ||
        el.value.split(".").length - 1 > 1
      ) {
        el.value = el.value.slice(0, lastCharIdx);
      }
    },
  },
};
</script>

<style>
.input {
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: var(--rgbHeader);
  border-color: var(--rgbLine);
  color: inherit;
}

.numerator {
  margin-bottom: 0.2rem;
  grid-row: 1;
}
hr {
  grid-row: 2;
}
.denominator {
  margin-top: 0.1rem;
  grid-row: 3;
}

.fraction-container {
  display: grid;
  grid-template-rows: auto auto;
  max-width: 2rem;
}
</style>
