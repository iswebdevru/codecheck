<script setup lang="ts">
const user = useUser();

const dropdownItems = [
  {
    to: "/profile",
    name: "Мой профиль",
  },
  // {
  //   to: "/",
  //   name: "Выйти",
  // },
];
</script>

<template>
  <nav class="nav">
    <div class="nav__list">
      <NavbarItem to="/">Главная</NavbarItem>
      <NavbarItem to="/challenges">Задания</NavbarItem>
      <NavbarItem v-if="user?.role === 1" to="/admin">Админ</NavbarItem>

      <NavbarDropdownItem v-if="user" :items="dropdownItems">{{
        user?.fio
      }}</NavbarDropdownItem>
      <NavbarItem v-else to="/login">Войти</NavbarItem>
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
    flex-wrap: wrap;
  }
}
</style>
