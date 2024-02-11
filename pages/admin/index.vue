<script setup lang="ts">
useHead({
  title: "Панель управления",
});
definePageMeta({
  middleware: "admin",
});
</script>

<template>
  <div class="admin">
    <div class="admin__container">
      <h1 class="admin__title">Панель управления</h1>
      <nav class="admin__nav">
        <NuxtLink class="admin__nav-item" to="/admin/challenges"
          >Добавить задание</NuxtLink
        >
        <NuxtLink class="admin__nav-item" to="/admin/tags"
          >Добавить тэги</NuxtLink
        >
      </nav>
    </div>
  </div>
</template>

<style scoped lang="scss">
.admin {
  &__container {
    margin: 0 auto;
    max-width: var(--width-container);
    padding-right: 1rem;
    padding-left: 1rem;
  }
  &__title {
    margin-bottom: 2rem;
  }
  &__nav {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  &__nav-item {
    border-radius: var(--border-radius);
    padding: 0.35rem 0.75rem;
    background: var(--color-warning);
    display: flex;
    justify-content: center;
    flex-grow: 1;
  }
}
</style>
