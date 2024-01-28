<script setup lang="ts">
const dropdownItems = [
  {
    to: "/profile",
    name: "Мой профиль",
  },
  {
    to: "/",
    name: "Выйти",
  },
];
</script>

<template>
  <nav class="nav">
    <div class="nav__list">
      <NavbarItem to="/">Главная</NavbarItem>
      <NavbarItem to="/challenges">Задания</NavbarItem>
      <NavbarDropdownItem :items="dropdownItems">Иван</NavbarDropdownItem>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.nav {
  &__list {
    display: flex;
    gap: 1rem;
    font-size: 1.2rem;
    list-style: none;
  }
}
</style>
