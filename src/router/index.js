import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ExamplesView from "../views/ExamplesView.vue";
import AlgorithmView from "../views/algorithms/AlgorithmView.vue";
import { algorithmRoutes } from "./algorithms";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/algorithm",
      name: "algorithm",
      component: AlgorithmView,
      children: algorithmRoutes,
    },
    {
      path: "/",
      name: "Home",
      component: HomeView,
      includeInHeader: true,
    },
    {
      path: "/examples",
      name: "Examples",
      component: ExamplesView,
      includeInHeader: true,
    },
  ],
});

export default router;
