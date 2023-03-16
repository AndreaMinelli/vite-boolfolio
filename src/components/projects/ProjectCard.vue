<script>
export default {
  name: "ProjectCard",
  props: { project: Object },
  computed: {
    setDescription() {
      let description = this.project.description;
      if (this.project.description.length >= 47)
        description = this.project.description.slice(0, 46) + "...";
      return description;
    },
  },
};
</script>

<template>
  <div class="card h-100">
    <div class="card-body">
      <h5 class="card-title text-capitalize mb-3">{{ project.name }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">
        <router-link
          class="text-muted text-decoration-none"
          :to="{ name: 'projects-for-type', params: { id: project.type_id } }"
          v-if="project.type"
          >{{ project.type.name }}</router-link
        >
        <span v-else>N.D.</span>
      </h6>
      <p class="card-text">
        {{ setDescription }}
      </p>
    </div>
    <div class="card-footer">
      <router-link
        class="btn btn-primary btn-sm"
        :to="{ name: 'project-details', params: { id: project.id } }">
        Visualizza
      </router-link>
    </div>
  </div>
</template>
