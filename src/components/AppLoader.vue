<script>
export default {
  name: "AppLoader",
};
</script>

<template>
  <div class="loader">
    <div class="spinner-border text-light" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.loader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba($color: #000000, $alpha: 0.8);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  .spinner-border {
    height: 100px;
    width: 100px;
  }
}
</style>
