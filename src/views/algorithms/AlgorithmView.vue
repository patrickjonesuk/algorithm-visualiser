<template>
  <example-display
    @start="exampleDisplay = false"
    :obj="obj"
    v-if="exampleDisplay"
  />
  <router-view v-else></router-view>
</template>

<script>
import { exampleObj } from "@/lib";
import ExampleDisplay from "@/components/ui/ExampleDisplay.vue";
export default {
  components: { ExampleDisplay },
  data() {
    return {
      exampleDisplay: false,
      obj: {},
    };
  },
  async created() {
    const { example } = this.$route.query;
    this.obj = await exampleObj(
      example,
      this.$route.path.split("/").slice(-1)[0]
    );
    if (Object.keys(this.obj).length && this.obj.display)
      this.exampleDisplay = true;
  },
};
</script>

<style scoped></style>
