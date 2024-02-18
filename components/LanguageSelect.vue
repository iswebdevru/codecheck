<script setup lang="ts">
type Lang = {
  id: number;
  name: string;
  status?: boolean;
};

interface Props {
  languages: Lang[];
}
const props = defineProps<Props>();

const selectedLanguage = ref(props.languages[0]);

// provide("selectedLanguage", selectedLanguage.value);
const emit = defineEmits(["selectedLanguage"]);

const selectLang = (item: any) => {
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
        :key="item.id"
      >
        <span v-if="item.status">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="1rem"
            height="1rem"
            viewBox="0 0 16 16"
          >
            <polygon
              fill="#00b569"
              points="5.857,14.844 0.172,9.032 3.031,6.235 5.888,9.156 12.984,2.06 15.812,4.888"
            ></polygon>
          </svg>
        </span>
        <img
          class="languages__img"
          :src="`/langs/${item.name?.toLowerCase()}.svg`"
          :alt="item.name"
        />
        <span class="languages__name"> {{ item.name }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.languages {
  &__list {
    list-style: none;
    display: flex;
    gap: 0.2rem;
  }
  &__img {
    width: 1rem;
    height: 1rem;
  }
  &__item {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.8rem;
    border-radius: var(--border-radius);
    border: 1px solid var(--color-border-primary);
    padding: 0.5rem;
    background: var(--color-bg-primary);
    color: var(--color-text-primary);
    &:hover {
      border: 1px solid var(--color-bg-secondary);
    }
    &.languages_active {
      background: var(--color-bg-secondary);
      color: var(--color-text-secondary);
    }
  }
}
</style>
