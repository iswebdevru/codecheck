<script setup></script>

<template>
  <NuxtLink to="/" class="logo">
    <span>КодЧек</span>
    <img class="logo__img" src="/logo.png" alt="Логотип" />
  </NuxtLink>
</template>

<style scoped lang="scss">
.logo {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  &__img {
    width: 2rem;
    height: 2rem;
  }
}
</style>
