<script>
const baseProjectsUrl = "http://127.0.0.1:8000/api";
import axios from "axios";
import AppAlert from "../components/AppAlert.vue";
import AppLoader from "../components/AppLoader.vue";
export default {
  name: "ProjectDetailsPage",
  components: { AppLoader, AppAlert },
  data() {
    return {
      alerts: {
        show: false,
        type: "",
        message: "",
      },
      isLoading: false,
      project: null,
    };
  },
  methods: {
    fetchProject() {
      this.isLoading = true;
      const endpoint = baseProjectsUrl + "/projects/" + this.$route.params.id;
      axios
        .get(endpoint)
        .then((res) => {
          this.project = res.data;
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
  computed: {
    technologies() {
      if (!this.project.technologies.length) return "N.D.";
      const lastElement = this.project.technologies.length - 1;
      let technologies = "";
      this.project.technologies.forEach((technology, i) => {
        technologies += `${technology.name}, `;
      });
      return technologies.slice(0, -2);
    },
    setDate() {
      const date = new Date(this.project.updated_at);
      return date.toLocaleDateString();
    },
  },
  created() {
    this.fetchProject();
  },
};
</script>

<template>
  <app-loader v-if="isLoading"></app-loader>
  <div class="container" v-else>
    <app-alert
      v-if="alerts.show"
      :alert="alerts"
      @close-alert="closeAlert"></app-alert>
    <h1 class="my-5 text-capitalize text-center">{{ project.name }}</h1>
    <img
      v-if="project.project_img"
      :src="project.project_img"
      :alt="project.name"
      class="img-fluid float-start me-5"
      width="300" />
    <div>{{ project.description }}</div>
    <div class="d-flex justify-content-between my-4">
      <p>
        <strong
          >Repository:
          <a :href="project.project_link">{{ project.name }}</a></strong
        >
      </p>
      <p><strong>Pubblicato:</strong> {{ project.published ? "Si" : "No" }}</p>
      <p>
        <strong>Tipo progetto:</strong>
        {{ project.type ? project.type.name : "N.D." }}
      </p>
      <p><strong>Tecnologie:</strong> {{ technologies }}</p>
      <p><strong>Ultimo Agg.:</strong> {{ setDate }}</p>
    </div>
  </div>
</template>

<style></style>
