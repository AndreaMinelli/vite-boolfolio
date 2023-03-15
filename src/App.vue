<script>
const baseProjectsUrl = "http://127.0.0.1:8000/api";
import axios from "axios";
import AppHeader from "./components/AppHeader.vue";
import ProjectCard from "./components/projects/ProjectCard.vue";
export default {
  name: "App",
  components: { AppHeader, ProjectCard },
  data() {
    return {
      projects: [],
    };
  },
  methods: {
    fetchProjects(endpoint = null) {
      if (!endpoint) endpoint = baseProjectsUrl + "/projects";
      axios.get(endpoint).then((res) => {
        this.projects = res.data;
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
  <div class="container">
    <h1 class="my-5">I miei progetti</h1>
    <ul class="row row-cols-3 list-unstyled g-3">
      <li class="col" v-for="project in projects" :key="project.id">
        <project-card :project="project"></project-card>
      </li>
    </ul>
  </div>
</template>

<style></style>
