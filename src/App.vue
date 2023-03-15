<script>
const baseProjectsUrl = "http://127.0.0.1:8000/api";
import axios from "axios";
import AppHeader from "./components/AppHeader.vue";
import AppAlert from "./components/AppAlert.vue";
import AppPagination from "./components/AppPagination.vue";
import AppLoader from "./components/AppLoader.vue";
import ProjectCard from "./components/projects/ProjectCard.vue";
export default {
  name: "App",
  components: { AppHeader, ProjectCard, AppPagination, AppLoader, AppAlert },
  data() {
    return {
      alerts: {
        show: false,
        type: "",
        message: "",
      },
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
        .catch(() => {
          this.alerts.show = true;
          this.alerts.type = "danger";
          this.alerts.message = "Si è verificato un errore nel caricamento.";
        })
        .then(() => {
          this.isLoading = false;
        });
    },
    closeAlert() {
      this.alerts.show = false;
      this.alerts.type = "";
      this.alerts.message = "";
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
    <app-alert
      v-if="alerts.show"
      :alert="alerts"
      @close-alert="closeAlert"></app-alert>
    <h1 class="my-5">I miei progetti</h1>
    <ul class="row row-cols-5 list-unstyled g-3" v-if="projects.data.length">
      <li class="col" v-for="project in projects.data" :key="project.id">
        <project-card :project="project"></project-card>
      </li>
    </ul>
    <h2 v-else class="text-center">Non ci sono progetti da visualizzare</h2>
  </div>
  <footer class="d-flex justify-content-center my-4" v-if="!isLoading">
    <app-pagination
      :links="projects.links"
      @change-page="fetchProjects"></app-pagination>
  </footer>
</template>

<style></style>
