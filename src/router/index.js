import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import ProjectDetailsPage from "../pages/ProjectDetailsPage.vue";

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  routes: [
    { path: "/projects", name: "home", component: HomePage },
    {
      path: "/projects/:id",
      name: "project-details",
      component: ProjectDetailsPage,
    },
  ],
});

export { router };
