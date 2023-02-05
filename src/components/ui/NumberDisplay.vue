<template>
  <div class="number-display">
    <span v-if="typeof number === 'number'">{{
      isNaN(number) ? "" : number
    }}</span>
    <div v-else class="frac">
      <span>{{ number.n }}</span>
      <span class="symbol">/</span>
      <span class="bottom">{{ number.d }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["number"],
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
  padding: 0.8rem;
  border-radius: 1rem;
}
</style>
