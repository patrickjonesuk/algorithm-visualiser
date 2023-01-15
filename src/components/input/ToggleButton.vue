<template>
  <button @click="click">{{ options[idx] }}</button>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
    },
    start_idx: {
      type: Number,
    },
  },
  data() {
    return {
      idx: this.start_idx,
    };
  },
  methods: {
    click() {
      this.idx = ++this.idx % this.options.length;
      this.$emit("update:start_idx", this.idx);
    },
  },
};
</script>

<style scoped>
button {
  margin-top: 0.5rem;
  background-color: var(--rgbHeader);
  border: 1px solid var(--rgbLine);
  border-radius: 5px;
  padding: 0.5rem;
  transition: 0.3s ease-in-out;
}
button:hover,
button:disabled {
  filter: brightness(75%);
}
</style>
