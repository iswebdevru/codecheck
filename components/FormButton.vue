<script setup lang="ts">
interface Props {
  background: string;
  color: string;
}

const props = withDefaults(defineProps<Props>(), {
  background: "var(--color-primary)",
  color: "var(--color-text-secondary)",
});
</script>

<template>
  <button
    :style="`background: ${props.background}; color: ${props.color}`"
    class="button"
  >
    <slot />
  </button>
</template>

<style scoped lang="scss">
.button {
  padding: 0.5rem 0.75rem;
  border-radius: var(--border-radius);
  display: flex;
  justify-content: center;
  width: 100%;
  // background: var(--color-primary);
  color: var(--color-text-secondary);
}
</style>
