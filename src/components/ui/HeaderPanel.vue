<template>
  <div class="header">
    <router-link
      v-for="route in routes"
      :key="route.name"
      class="link"
      :to="route.path"
      >{{ route.name }}</router-link
    >
  </div>
</template>

<script>
export default {
  computed: {
    routes() {
      return this.$router.options.routes.filter(
        (route) => route.includeInHeader
      );
    },
  },
};
</script>

<style>
.header {
  background-color: var(--rgbHeader);
  height: 10vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  padding-left: 1rem;
}

.link {
  border: 1px solid var(--rgbLine);
  padding: 1rem;
  background-color: var(--rgbHeader);
  margin-right: 1rem;
}
.link:hover {
  filter: saturate(80%);
}
</style>
