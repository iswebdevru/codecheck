<script setup>
useHead({
  title: "Профиль",
});
definePageMeta({
  middleware: "protected",
});

const user = useUser();
</script>

<template>
  <div class="profile">
    <div class="profile__container">
      <h1 class="profile__name">{{ user?.fio }}</h1>
      <h2 class="profile__username">{{ user?.username }}</h2>
      <span class="profile__email">{{ user?.email }}</span>
      <span class="profile__group">{{ user?.group }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.profile {
  &__container {
    margin: 0 auto;
    max-width: var(--width-container);
    padding-right: 1rem;
    padding-left: 1rem;
    display: flex;
    flex-direction: column;
  }
}
</style>
