<template>
  <div class="number-display" :style="css">
    <span v-if="typeof number === 'number'">{{
      isNaN(number) ? "" : number === Infinity ? "∞" : number
    }}</span>
    <div v-else-if="isFraction" class="frac">
      <span>{{ number.s === -1 ? "-" : "" }}{{ number.n }}</span>
      <span class="symbol">/</span>
      <span class="bottom">{{ number.d }}</span>
    </div>
    <template v-else-if="splitString">
      <NumberDisplay
        v-for="(part, i) of parts"
        :number="part"
        :padding="'0px'"
        :key="i"
      />
    </template>
    <span class="text" v-else>
      {{ number }}
    </span>
  </div>
</template>

<script>
import { fraction } from "mathjs";

export default {
  props: {
    number: {},
    padding: {
      default: "0.8rem",
    },
  },
  methods: {
    stringParts() {
      if (typeof this.number !== "string" && !!this.number.n) return [];
      return this.number.toString().split("||");
    },
  },
  computed: {
    isFraction() {
      return !!this.number.n;
    },
    parts() {
      const parts = this.stringParts();
      const out = [];
      for (let i = 0; i < parts.length; i++) {
        if (i % 2 === 1) {
          if (isNaN(parts[i])) {
            try {
              out.push(fraction(parts[i]));
            } catch (e) {
              out.push(parts[i]);
            }
          } else out.push(parseFloat(parts[i]));
        } else if (parts[i] !== "") {
          out.push(parts[i]);
        }
      }
      return out;
    },
    splitString() {
      return this.stringParts().length > 1;
    },
    css() {
      return {
        padding: this.padding,
        visibility: this.number === "" ? "hidden" : "visible",
      };
    },
  },
};
</script>

<style>
.frac {
  display: inline-block;
  position: relative;
  vertical-align: middle;
  letter-spacing: 0.001em;
  text-align: center;
}
.frac > span {
  display: block;
  padding: 0.1em;
}
.frac span.bottom {
  border-top: thin solid var(--rgbForeground);
}
.frac span.symbol {
  display: none;
}
.number-display {
  background-color: var(--rgbHeader);
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.text {
  white-space: pre;
}
</style>
