import SortView from "../views/algorithms/SortView.vue";
import SimplexView from "../views/algorithms/SimplexView.vue";
import TableView from "../views/algorithms/TableView.vue";
import { PrimsAlgorithm, FloydsAlgorithm } from "@/algorithms";
import { NearestNeighbourAlgorithm } from "../algorithms/graph/nearest_neighbour";

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

const graphRoutes = [
  {
    path: "graph/prim",
    name: "Prim's",
    component: TableView,
    props: {
      algorithmClass: PrimsAlgorithm,
      allow_infinity: true,
    },
    _info: {
      category: "Graph",
    },
  },
  {
    path: "graph/nearest_neighbour",
    name: "Nearest Neighbour",
    component: TableView,
    props: {
      algorithmClass: NearestNeighbourAlgorithm,
    },
    _info: {
      category: "Graph",
    },
  },
  {
    path: "graph/floyd",
    name: "Floyd's",
    component: TableView,
    props: {
      algorithmClass: FloydsAlgorithm,
      allow_infinity: true,
      multi_table: true,
    },
    _info: {
      category: "Graph",
    },
  },
];

export const algorithmRoutes = [
  ...sortRoutes,
  ...graphRoutes,

  {
    path: "simplex",
    name: "Simplex",
    component: SimplexView,
    _info: {
      category: "Simplex",
    },
  },
];
