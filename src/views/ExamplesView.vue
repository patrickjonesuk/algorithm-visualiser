<template>
  <div class="root">
    <div
      v-for="category in Object.keys(categories)"
      :key="category"
      class="category-container"
    >
      <div class="title">
        {{ categories[category].name }}
        <hr />
      </div>
      <div class="example-container">
        <router-link
          class="example"
          v-for="(example, i) in examples[category]"
          :key="i"
          :to="`${categories[category].route}?example=${i}`"
        >
          {{ example.title }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { algorithmRoutes } from "@/router/algorithms";
import { examplesFor } from "@/lib";
export default {
  data() {
    return {
      examples: {},
      categories: algorithmRoutes.reduce(
        (obj, { name, path }) =>
          Object.assign(obj, {
            [path.split("/").slice(-1)[0]]: {
              name: name,
              route: `/algorithm/${path}`,
            },
          }),
        {}
      ),
    };
  },
  async created() {
    for (const category of Object.keys(this.categories)) {
      const examples = await examplesFor(category);
      this.examples[category] = examples;
    }
  },
};
</script>

<style scoped>
.category-container,
.example {
  border: 1px solid var(--rgbLine);
  padding: 1rem;
  margin: 1rem;
  background-color: var(--rgbBackground);
}
.example {
  margin: 0.5rem;
}

.example-container {
  display: flex;
  flex-wrap: wrap;
}
.example:hover {
  filter: saturate(75%);
}
.title {
  font-weight: bold;
}
.root {
  margin: 2rem;
}
</style>
