<template>
  <div class="header">
    <router-link class="link" to="/">Home</router-link>
  </div>
</template>

<script>
export default {};
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
}
.link:hover {
  filter: saturate(80%);
  /* background-color: var(--rgbLine); */
}
</style>
