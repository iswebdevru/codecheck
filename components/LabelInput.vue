<script setup lang="ts">
interface Props {
  for: string;
}

const props = defineProps<Props>();
</script>

<template>
  <label class="label" :for="props.for"><slot /></label>
</template>

<style scoped lang="scss">
.label {
  color: var(--color-text-link);
}
</style>
