import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Typography from "../views/Typography";
import VueComponents from "../views/VueComponents";
import Forms from "../views/Forms";
import System from "../views/System";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/system/:id",
    name: "System",
    component: System,
  },
  {
    path: "/typography",
    name: "Typography",
    component: Typography,
  },
  {
    path: "/components",
    name: "Vue Components",
    component: VueComponents,
  },
  {
    path: "/forms",
    name: "Forms",
    component: Forms,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
