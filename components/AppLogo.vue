<script setup></script>

<template>
  <NuxtLink to="/" class="logo">
    <img class="logo__img" src="/logo.png" alt="Логотип" />
    <span>КодЧек</span>
  </NuxtLink>
</template>

<style scoped lang="scss">
.logo {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  gap: 0.8rem;
  &__img {
    width: 2rem;
    height: 2rem;
  }
}
</style>
