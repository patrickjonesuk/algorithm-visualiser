<template>
  <div class="fraction-container">
    <input
      @input="inputNumerator"
      class="input numerator"
      ref="numerator"
      :style="value.fraction ? { marginBottom: '.25rem' } : {}"
    />
    <hr v-if="value.fraction" />
    <input
      @keydown="keyDown"
      @input="inputDenominator"
      class="input denominator"
      v-show="value.fraction"
      :style="{ opacity: value.fraction ? 1 : 0 }"
      ref="denominator"
      v-model="value.denominator"
    />
  </div>
</template>

<script>
import { fraction } from "mathjs";
export default {
  props: {
    value: {},
    allow_infinity: {
      default: false,
    },
  },

  data() {
    return {
      fraction: false,
      numerator: this.value,
      denominator: 0,
      infinity: false,
    };
  },
  mounted() {
    if (this.value.value === null) {
      this.infinity = true;
      this.value.numerator = Infinity;
      this.value.value = Infinity;
    }
    this.value.value = this.inputValue;
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
      if (_new.numerator === Infinity) {
        this.$refs.numerator.value = "∞";
        this.infinity = true;
      }
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
        const lastCharIdx = evt.target.value.length - 1;
        const lastChar = evt.target.value[lastCharIdx];
        if (this.infinity) {
          evt.target.value = "";
          this.infinity = false;
          this.value.numerator = 0;
          return;
        }
        if (lastCharIdx === 0 && lastChar === "i" && this.allow_infinity) {
          evt.target.value = "∞";
          this.infinity = true;
          this.value.numerator = Infinity;
          return;
        }
        const numPoints = evt.target.value.split(".").length - 1;
        if (lastChar === "/") {
          evt.target.value = evt.target.value.slice(0, lastCharIdx);
          if (numPoints === 0 && lastCharIdx > 0) {
            this.value.fraction = true;
            this.$refs.denominator.style.removeProperty("display"); // v-show does not update soon enough to allow setting focus here.
            this.$refs.denominator.focus();
          }
          return;
        }
        const matchRe =
          lastCharIdx > 0 ? (numPoints === 1 ? /[0-9.]/ : /[0-9]/) : /[0-9\-]/;
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

      this.value.denominator = evt.target.value;
    },
  },
};
</script>

<style>
.fraction-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  align-items: start;
}

.input:last-child {
  margin-top: 0.25rem;
}

.input {
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: var(--rgbHeader);
  border-color: var(--rgbLine);
  color: inherit;
  text-align: center;
  width: 6rem;
}
hr {
  width: 6rem;
}
</style>
