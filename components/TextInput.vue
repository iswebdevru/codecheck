<script setup lang="ts">
interface Props {
  name: string;
  id: string;
  placeholder?: string;
  modelValue: string | null;
}
const props = defineProps<Props>();
const emits = defineEmits(["update:modelValue"]);
</script>

<template>
  <input
    :value="props.modelValue"
    @input="(event: any) => emits('update:modelValue', event.target.value)"
    class="textinput"
    :placeholder="props.placeholder"
    type="text"
    :name="props.name"
    :id="props.id"
  />
</template>

<style scoped lang="scss">
.textinput {
  padding: 0.375rem 0.75rem;
  border-radius: var(--border-radius);
  border: 1px solid var(--color-border-primary);
  width: 100%;
  display: flex;
  &:focus {
    outline: 1px solid var(--color-primary);
  }
}
</style>
