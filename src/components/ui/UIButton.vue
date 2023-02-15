<template>
  <button><slot /></button>
</template>

<script>
export default {
  props: {
    button_style: {
      default: { "margin-top": ".5rem" },
    },
  },
};
</script>

<style scoped>
button {
  margin-right: 1rem;
  background-color: var(--rgbHeader);
  border: 1px solid var(--rgbLine);
  border-radius: 5px;
  padding: 0.5rem;
  transition: 0.3s ease-in-out;
  color: var(--rgbForeground);
}
button:hover,
button:disabled {
  filter: brightness(75%);
}
</style>
