<template>
  <UIButton @click="click">{{ options[idx] }}</UIButton>
</template>

<script>
import UIButton from "../ui/UIButton.vue";
export default {
  components: { UIButton },
  props: {
    options: {
      type: Array,
    },
    start_idx: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      idx: this.start_idx,
    };
  },
  watch: {
    start_idx(_new) {
      this.idx = _new;
    },
  },
  methods: {
    click() {
      this.idx = ++this.idx % this.options.length;
      this.$emit("update:start_idx", this.idx);
    },
  },
};
</script>

<style scoped></style>
