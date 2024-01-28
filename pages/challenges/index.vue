<script setup lang="ts">
const challenges = [
  {
    id: 1,
    title: "«Привет, Мир!» Как работает CodeChick",
    description:
      "Это вводное задание, благодаря которому вы поймете, как работает CodeChick.",
    tags: [
      {
        id: 1,
        name: "Легко",
      },
    ],
  },
  {
    id: 2,
    title: "«Привет, Мир!» Как работает CodeChick",
    description:
      "Это вводное задание, благодаря которому вы поймете, как работает CodeChick.",
    tags: [
      {
        id: 1,
        name: "Легко",
      },
    ],
  },
];
</script>

<template>
  <div class="challenges">
    <div class="challenges__container">
      <div class="challenges__aside"></div>
      <div class="challenges__body">
        <h1 class="">Задания</h1>
        <div class="challenges__items">
          <div
            v-for="item in challenges"
            :key="item.id"
            class="challenges__item item"
          >
            <NuxtLink :to="`/challenges/${item.id}`" class="item__title">{{
              item.title
            }}</NuxtLink>
            <p class="item__description">{{ item.description }}</p>
            <div v-if="item.tags" class="item__tags">
              <span v-for="tag in item.tags" :key="tag.id" class="item__tag">{{
                tag.name
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.challenges {
  &__container {
    margin: 0 auto;
    max-width: var(--width-container);
    padding-right: 1rem;
    padding-left: 1rem;
  }
  &__items {
    display: grid;
    grid-template-rows: auto;
    row-gap: 2rem;
  }
}

.item {
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.086);
  &__title {
    color: black;
    font-size: 2rem;
  }
  &__description {
    font-size: 1.2rem;
  }
  &__tag {
    background: black;
    color: white;
    font-size: 0.9rem;
    padding: 0.4rem;
    border-radius: 0.3rem;
  }
}
</style>
