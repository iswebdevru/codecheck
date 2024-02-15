<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});
useHead({
  title: props.error?.statusCode.toString(),
});
</script>

<template>
  <NuxtLayout>
    <div class="error">
      <div class="error__body">
        <span>Упс.. Что-то пошло не так</span>
        <h2>{{ error?.statusCode }}</h2>
        <NuxtLink :external="true" to="/">На главную</NuxtLink>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped lang="scss">
.error {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  &__body {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    span {
    }
    h2 {
      font-size: 3rem;
    }
  }
}
</style>
