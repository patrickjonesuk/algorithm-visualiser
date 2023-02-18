import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
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
      name: "/home",
      component: HomeView,
    },
  ],
});

export default router;
