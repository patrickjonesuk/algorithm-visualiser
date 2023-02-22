<template>
  <div class="wrapper">
    <div class="title">{{ obj.title }}</div>
    <div class="description" v-html="obj.description" />
    <UIButton @click="$emit('start')">Start</UIButton>
  </div>
</template>

<script>
import UIButton from "./UIButton.vue";

export default {
  components: { UIButton },
  emits: ["start"],
  props: {
    obj: {},
  },

  data() {
    return {};
  },
};
</script>

<style scoped>
.wrapper {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title {
  font-weight: bold;
  text-decoration: underline;
  font-size: large;
}
.title,
.description {
  margin: 1rem;
  padding: 1rem;
  border: 1px solid var(--rgbLine);
  text-align: center;
}
.description {
  width: 100%;
}
</style>
