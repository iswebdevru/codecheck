<script setup lang="ts">
interface Props {
  background?: string;
  color?: string;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  background: "var(--color-primary)",
  color: "var(--color-text-secondary)",
  loading: true,
});
</script>

<template>
  <button
    :style="`background: ${props.background}; color: ${props.color}`"
    class="button"
  >
    <slot v-if="props.loading" />
    <span v-else class="loader"></span>
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
  // position: relative;
  height: 2rem;
}

.loader {
  width: 1rem;
  height: 1rem;
  border-width: 2px;
  border-style: solid;
  // position: absolute;
  // border: 5px solid black;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
