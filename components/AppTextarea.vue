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
  <textarea
    class="textarea"
    :value="props.modelValue"
    @input="(event: any) => emits('update:modelValue', event.target.value)"
    :name="props.name"
    :id="props.id"
    :placeholder="props.placeholder"
    cols="30"
    rows="10"
  ></textarea>
</template>

<style scoped lang="scss">
.textarea {
  width: 100%;
  padding: 0.375rem 0.75rem;
  resize: vertical;
  border-radius: var(--border-radius);
  border: 1px solid var(--color-border-primary);
}
</style>
