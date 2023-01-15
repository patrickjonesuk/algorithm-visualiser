<template>
  <div class="panel-root">
    <div class="buttons">
      <button
        v-bind="btn.bind"
        class="btn"
        @click="btn.func()"
        :style="{ 'grid-row': idx + 1 }"
        v-for="(btn, idx) in buttons"
        :key="idx"
      >
        {{ btn.label }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["buttons"],
  computed: {
    gridStyle() {
      return {
        gridTemplateColumns: `repeat(${this.buttons.length}, minmax(100px 1fr))`,
      };
    },
  },
};
</script>

<style>
.panel-root {
  background-color: var(--rgbHeader);
  display: grid;
  padding: 1rem;
  grid-template-rows: 3rem auto;
  max-width: 15rem;
}
.buttons {
  display: grid;
  grid-template-rows: repeat(auto-fill, max-content);
  position: relative;
}

.btn {
  margin-top: 0.5rem;
  background-color: var(--rgbGreen);
  border: 1px solid var(--rgbLine);
  border-radius: 5px;
  padding: 0.5rem 0 0.5rem 0;
  transition: 0.3s ease-in-out;
}
.btn:hover,
.btn:disabled {
  filter: brightness(75%);
}

.buttons > :first-child {
  margin-top: 0;
}
</style>
