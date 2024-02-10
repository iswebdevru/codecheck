<script setup lang="ts">
useHead({
  title: "Добавление тэга",
});
const tag = ref();
const storeTag = () => {
  const data = $fetch("/api/tags", {
    method: "POST",
    body: {
      name: tag.value,
    },
  });
  console.log(data);
};
</script>

<template>
  <div class="tags">
    <div class="tags__container">
      <form @submit.prevent="storeTag" class="tags__form">
        <TextInput v-model="tag" id="tag" name="tag"></TextInput>
        <FormButton>Добавить тэг</FormButton>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tags {
  &__container {
    margin: 0 auto;
    max-width: var(--width-container);
    padding-right: 1rem;
    padding-left: 1rem;
  }
  &__form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
    justify-content: flex-start;
    // max-width: 400px;
  }
}
</style>
