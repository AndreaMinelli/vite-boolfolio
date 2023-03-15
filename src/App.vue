<script>
const baseProjectsUrl = "http://127.0.0.1:8000/api";
import axios from "axios";
import AppHeader from "./components/AppHeader.vue";
import AppPagination from "./components/AppPagination.vue";
import AppLoader from "./components/AppLoader.vue";
import ProjectCard from "./components/projects/ProjectCard.vue";
export default {
  name: "App",
  components: { AppHeader, ProjectCard, AppPagination, AppLoader },
  data() {
    return {
      isLoading: false,
      projects: {
        data: [],
        links: [],
      },
    };
  },
  methods: {
    fetchProjects(endpoint = null) {
      this.isLoading = true;
      if (!endpoint) endpoint = baseProjectsUrl + "/projects";
      axios
        .get(endpoint)
        .then((res) => {
          const { data, links } = res.data;
          this.projects = { data, links };
        })
        .catch()
        .then(() => {
          this.isLoading = false;
        });
    },
  },
  created() {
    this.fetchProjects();
  },
};
</script>

<template>
  <app-header></app-header>
  <app-loader v-if="isLoading"></app-loader>
  <div class="container" v-else>
    <h1 class="my-5">I miei progetti</h1>
    <ul class="row row-cols-5 list-unstyled g-3">
      <li class="col" v-for="project in projects.data" :key="project.id">
        <project-card :project="project"></project-card>
      </li>
    </ul>
  </div>
  <footer class="d-flex justify-content-center my-4">
    <app-pagination
      :links="projects.links"
      @change-page="fetchProjects"></app-pagination>
  </footer>
</template>

<style></style>
