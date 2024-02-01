<script setup lang="ts">
interface dropdownItem {
  name: String;
  to: String;
}

interface Props {
  items: dropdownItem[];
}

const props = defineProps<Props>();
const dropdown = ref();
const open = ref(false);

const handleOpen = () => {
  const closeListerner = (e: Event) => {
    if (!(e.target === dropdown.value || dropdown.value?.contains(e.target)))
      window.removeEventListener("click", closeListerner), (open.value = false);
  };
  window.addEventListener("click", closeListerner);
  open.value = !open.value;
};

const logout = async () => {
  await useFetch("/api/auth/logout", {
    method: "POST",
  });
  navigateTo("/login");
};
</script>

<template>
  <div
    ref="dropdown"
    @click="handleOpen()"
    class="nav__item_dropdown"
    :aria-expanded="open"
  >
    <button class="nav__btn">
      <span> <slot /> </span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="nav__icon"
      >
        <path
          fill-rule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <div class="dropdown">
      <NuxtLink
        v-for="item in props.items"
        :to="item.to"
        class="dropdown__item"
        >{{ item.name }}</NuxtLink
      >
      <button class="dropdown__item" @click="logout">Выйти</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.nav {
  &__btn {
    padding: 1rem 0;
    display: flex;
    align-items: center;
    position: relative;
    // font-weight: 600;
    text-decoration: none;
    color: var(--color-text-link);
    // &:hover {
    //   color: var(--color-primary);
    // }

    // .dropdown & {
    //   padding: 1rem 2rem;
    //   min-width: 100%;
    // }
  }
  &__item_dropdown {
    font-size: 1rem;
    position: relative;
    cursor: pointer;
    &[aria-expanded="true"] .dropdown {
      display: flex;
    }
  }
  &__icon {
    width: 1.5rem;
    height: 1.5rem;
  }
}
.dropdown {
  position: absolute;
  background: white;
  display: none;
  flex-direction: column;
  // align-items: flex-start;
  top: 100%;
  right: 0;
  left: auto;
  min-width: fit-content;
  overflow: hidden;
  &__item {
    white-space: nowrap;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    position: relative;
    // font-size: 1rem;
    // font-weight: 600;
    text-decoration: none;
    color: var(--color-text-link);
    // width: 100%;
    &:hover {
      background: rgba(128, 128, 128, 0.057);
    }
  }
}
</style>
