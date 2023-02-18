import SortView from "../views/algorithms/SortView.vue";
import SimplexView from "../views/algorithms/SimplexView.vue";
import TableView from "../views/algorithms/TableView.vue";

const sortRoutes = ["Bubble", "Quick"].map((name, i) => ({
  path: `sort/${name.toLowerCase()}_sort`,
  name: `${name} Sort`,
  component: SortView,
  props: {
    sortclass: i,
  },
  _info: {
    category: "Sort",
  },
}));

export const algorithmRoutes = [
  ...sortRoutes,

  {
    path: "simplex",
    name: "Simplex",
    component: SimplexView,
    _info: {
      category: "Simplex",
    },
  },
  {
    path: "graph/prim",
    name: "Prim's",
    component: TableView,
    _info: {
      category: "Graph",
    },
  },
];
