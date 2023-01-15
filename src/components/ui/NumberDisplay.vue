<template>
  <span v-if="typeof number === 'number'">{{ number }}</span>
  <div v-else class="frac">
    <span>{{ number.n }}</span>
    <span class="symbol">/</span>
    <span class="bottom">{{ number.d }}</span>
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
</style>
