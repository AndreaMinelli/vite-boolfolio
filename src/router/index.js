import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import ProjectDetailsPage from "../pages/ProjectDetailsPage.vue";
import ProjectsForTypePage from "../pages/ProjectsForTypePage.vue";
import NotFoundPage from "../pages/NotFoundPage.vue";

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  routes: [
    {
      path: "/projects",
      name: "home",
      component: HomePage,
    },
    {
      path: "/projects/:id",
      name: "project-details",
      component: ProjectDetailsPage,
    },
    {
      path: "/types/:id/projects",
      name: "projects-for-type",
      component: ProjectsForTypePage,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFoundPage,
    },
  ],
});

export { router };
