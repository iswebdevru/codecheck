<script setup lang="ts">
const user = useUser();

const dropdownItems = [
  {
    to: "/profile",
    name: "Мой профиль",
  },
];

const menuOpened = ref(false);

const open = () => {
  menuOpened.value = !menuOpened.value;
};
const handleMenuItem = (e: any) => {
  // console.log(e.target.nodeName);
  if (e.target.nodeName == "A" || e.target.nodeName == "BUTTON") {
    menuOpened.value = false;
  }
};
</script>

<template>
  <nav class="nav">
    <div
      @click="handleMenuItem($event)"
      :aria-expanded="menuOpened"
      class="nav__list"
    >
      <NavbarItem to="/">Главная</NavbarItem>
      <NavbarItem to="/challenges">Задания</NavbarItem>
      <NavbarItem to="/olimp">Олимп</NavbarItem>
      <NavbarItem v-if="user?.role === 1" to="/admin">Админ</NavbarItem>

      <NavbarDropdownItem v-if="user" :items="dropdownItems">{{
        user?.fio
      }}</NavbarDropdownItem>
      <NavbarItem v-else to="/login">Войти</NavbarItem>
    </div>
    <button @click="open" :aria-expanded="menuOpened" class="nav__btn">
      <span></span>
    </button>
  </nav>
</template>

<style scoped lang="scss">
.nav {
  &__btn {
    display: none;
    z-index: 50;
    width: 40px;
    height: 25px;
    position: relative;

    @media (max-width: 768px) {
      display: block;
    }
    span,
    &::after,
    &::before {
      position: absolute;
      content: "";
      display: block;
      border-radius: var(--border-radius);
      height: 4px;
      width: 100%;
      background: var(--color-text-primary);
      transition: all 0.3s ease 0s;
    }
    span {
      transform: translateY(-50%);
    }
    &::before {
      top: 0;
    }
    &::after {
      bottom: 0;
    }

    &[aria-expanded="true"] {
      span {
        transform: scale(0);
      }
      &::before {
        top: 50%;
        transform: rotate(135deg);
      }
      &::after {
        top: 50%;
        transform: rotate(-135deg);
      }
    }
  }
  &__list {
    display: flex;
    gap: 1rem;
    font-size: 1.2rem;
    list-style: none;
    flex-wrap: wrap;
    transition: transform 0.3s ease 0s;

    @media (max-width: 768px) {
      position: fixed;
      top: 0;
      left: 0;
      flex-direction: column;
      background: var(--color-bg-primary);
      width: 100%;
      height: 100%;
      padding-top: 60px;
      transform: translateX(-100%);
      padding-left: 1rem;
      padding-right: 1rem;
      &[aria-expanded="true"] {
        transform: translateX(0);
      }
    }
  }
}
</style>
