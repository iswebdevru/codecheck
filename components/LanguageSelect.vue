<script setup lang="ts">
interface Props {
  languages: string[];
}
const props = defineProps<Props>();

const selectedLanguage = ref(props.languages[0]);

// provide("selectedLanguage", selectedLanguage.value);
const emit = defineEmits(["selectedLanguage"]);

const selectLang = (item: string) => {
  selectedLanguage.value = item;
  emit("selectedLanguage", selectedLanguage.value);
};
</script>

<template>
  <div class="languages">
    <div class="languages__list">
      <button
        @click="selectLang(item)"
        class="languages__item"
        :class="{ languages_active: selectedLanguage === item }"
        v-for="item in props.languages"
      >
        {{ item }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.languages {
  &__list {
    list-style: none;
    display: flex;
  }
  &__item {
    font-size: 0.8rem;
    border-radius: var(--border-radius);
    border: 1px solid var(--color-border-primary);
    padding: 0.5rem;
    background: var(--color-bg-primary);
    color: var(--color-text-primary);
    &.languages_active {
      background: var(--color-bg-secondary);
      color: var(--color-text-secondary);
    }
  }
}
</style>
