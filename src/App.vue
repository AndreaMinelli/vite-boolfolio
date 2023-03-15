<script>
const baseProjectsUrl = "http://127.0.0.1:8000/api";
import axios from "axios";
import AppHeader from "./components/AppHeader.vue";
export default {
  name: "App",
  components: { AppHeader },
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
  <div class="container"></div>
</template>

<style></style>
