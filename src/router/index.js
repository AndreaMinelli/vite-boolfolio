import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  routes: [{ path: "/", name: "home", component: HomePage }],
});

export { router };
