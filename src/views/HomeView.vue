<template>
  <div class="root">
    <div
      class="category-container"
      v-for="category in categories"
      :key="category"
    >
      <div class="category-header">
        {{ category }}
        <hr />
      </div>
      <div class="algorithm-container">
        <router-link
          class="algorithm-item"
          v-for="algorithm in categoryAlgorithms(category)"
          :key="algorithm.name"
          :to="`/algorithm/${algorithm.path}`"
        >
          {{ algorithm.name }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { algorithmRoutes } from "@/router/algorithms";
export default {
  data() {
    return {
      algorithm_routes: algorithmRoutes,
    };
  },
  methods: {
    /**
     * @param {string} category
     * @returns {Object[]}
     */
    categoryAlgorithms(category) {
      return algorithmRoutes.filter(
        (route) => route._info.category === category
      );
    },
  },
  computed: {
    categories() {
      return algorithmRoutes
        .map((route) => route._info.category)
        .filter((value, i, arr) => arr.indexOf(value) === i);
    },
  },
};
</script>

<style scoped>
.root {
  margin: 2rem;
}
.category-container {
  border: 1px solid var(--rgbLine);
  padding: 1rem;
  margin: 1rem;
}
.category-header {
  font-weight: bold;
}
.algorithm-container {
  display: flex;
}
.algorithm-item {
  border: 1px solid var(--rgbLine);
  background-color: var(--rgbHeader);
  background-color: var(--rgbBackground);
  padding: 1rem;
  margin: 1rem;
  transition: 0.2s ease-in-out;
}
.algorithm-item:hover {
  filter: saturate(75%);
}
</style>
