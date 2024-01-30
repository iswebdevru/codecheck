<script setup lang="ts">
interface Props {
  to: string;
}
const props = defineProps<Props>();
</script>

<template>
  <NuxtLink class="nav__item" :to="props.to"><slot /></NuxtLink>
</template>

<style scoped lang="scss">
.nav {
  &__item {
    font-size: 1rem;
    padding: 1rem;
    display: flex;
    align-items: center;
    position: relative;
    // font-weight: 600;
    text-decoration: none;
    color: var(--color-text-link);
    &:hover {
      color: var(--color-primary);
    }
    &.router-link-active {
      color: var(--color-primary);
    }
  }
}
</style>
