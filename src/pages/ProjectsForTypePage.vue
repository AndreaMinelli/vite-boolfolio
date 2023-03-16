<script>
const baseProjectsUrl = "http://127.0.0.1:8000/api";
import axios from "axios";
import AppAlert from "../components/AppAlert.vue";
import AppPagination from "../components/AppPagination.vue";
import AppLoader from "../components/AppLoader.vue";
import ProjectCard from "../components/projects/ProjectCard.vue";
export default {
  name: "ProjectsForTypePage",
  components: { ProjectCard, AppPagination, AppLoader },
  data() {
    return {
      isLoading: false,
      projects: {
        data: [],
        links: [],
      },
      type: null,
    };
  },
  methods: {
    fetchProjects(endpoint = null) {
      this.isLoading = true;
      if (!endpoint)
        endpoint =
          baseProjectsUrl + "/types/" + this.$route.params.id + "/projects";
      axios
        .get(endpoint)
        .then((res) => {
          const { data, links } = res.data.projects;
          this.projects = { data, links };
          this.type = res.data.type;
        })
        .catch(() => {
          this.$router.push({ name: "not-found" });
        })
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
  <app-loader v-if="isLoading"></app-loader>
  <div class="container" v-else>
    <h1 class="my-5">Progetti di tipo {{ type.name }}</h1>
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
