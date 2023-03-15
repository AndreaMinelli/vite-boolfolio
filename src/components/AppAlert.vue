<script>
export default {
  name: "AppAlert",
  props: { alert: Object },
  emits: ["close-alert"],
};
</script>

<template>
  <div
    class="alert alert-dismissible fade show my-4"
    :class="[`alert-${alert.type}`]"
    role="alert">
    {{ alert.message }}
    <button
      type="button"
      class="btn-close"
      @click="$emit('close-alert')"></button>
  </div>
</template>

<style></style>
