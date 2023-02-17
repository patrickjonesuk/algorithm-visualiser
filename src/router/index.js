import { createRouter, createWebHistory } from "vue-router";
import SortView from "../views/SortView.vue";
import SimplexView from "../views/SimplexView.vue";
import TableView from "../views/TableView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/sort",
      name: "sort",
      component: SortView,
    },
    {
      path: "/simplex",
      name: "simplex",
      component: SimplexView,
    },
    {
      path: "/prim",
      name: "prim",
      component: TableView,
    },
  ],
});

export default router;
