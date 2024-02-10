<script setup lang="ts">
interface Props {
  title: string;
  selectedTitle?: string;
}
const props = defineProps<Props>();

const selectedTitle = inject("selectedTitle");
</script>

<template>
  <div v-show="props.title == selectedTitle">
    <slot />
  </div>
</template>

<style></style>
