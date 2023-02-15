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
    <div class="stats" v-if="Object.keys(stats).length !== 0">
      <span v-for="stat in Object.keys(stats)" :key="stat">
        {{ stat }}: {{ stats[stat] }}<br />
        <hr />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["buttons", "stats"],
};
</script>

<style>

.stats {
  border: 0.15rem solid var(--rgbLine);
  margin-top: 1rem;
  padding: 0.5rem;
}

.panel-root {
  background-color: var(--rgbHeader);
  padding: 1rem;
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
