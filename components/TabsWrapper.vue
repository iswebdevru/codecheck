<script setup lang="ts">
interface Props {
  name: string;
}
const props = defineProps<Props>();

const slots: any = useSlots();
const tabTitles = ref(slots.default().map((tab: any) => tab.props.title));
// const selectedTitle = ;
const selectedTitle = useState(props.name, () => tabTitles.value[0]);

provide("selectedTitle", selectedTitle);

const emit = defineEmits(["tab"]);

const clickTab = (title: string) => {
  emit("tab", title);
  selectedTitle.value = title;
};
</script>

<template>
  <div class="tabs">
    <button
      v-for="title in tabTitles"
      :key="title"
      @click="clickTab(title)"
      class="tabs__tab"
      :class="{ tab_active: selectedTitle == title }"
    >
      {{ title }}
    </button>
  </div>
  <div class="tabs__body">
    <slot class="tabs__top" name="top" />
    <slot class="tabs__main" />
    <slot class="tabs__bottom" name="bottom" />
  </div>
</template>

<style scoped lang="scss">
.tabs {
  border-bottom: 1px var(--color-border-primary) solid;
  &__top {
  }
  &__body {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;
    padding: 0 1rem;
  }
  &__tab {
    background: none;
    padding: 1rem 1.2rem;
    font-size: 1rem;
    margin-bottom: -1px;
    border-bottom: 1px var(--color-border-primary) solid;
    &.tab_active {
      color: var(--color-primary);
      // background: rgba(128, 128, 128, 0.225);
      border-bottom: 1px var(--color-primary) solid;
    }
  }
}
</style>
