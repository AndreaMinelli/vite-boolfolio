<script>
export default {
  name: "AppPagination",
  props: { links: Array },
  emits: ["change-page"],
};
</script>

<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li
        :class="['page-item', { disabled: !link.url }, { active: link.active }]"
        v-for="link in links"
        :key="link.label">
        <button
          type="button"
          class="page-link"
          v-html="link.label"
          @click="$emit('change-page', link.url)"></button>
      </li>
    </ul>
  </nav>
</template>
