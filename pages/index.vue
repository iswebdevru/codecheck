<script setup>
useHead({
  title: "Главная",
  meta: [
    {
      name: "description",
      content:
        "КодЧек - это платформа для онлайн-практики алгоритмов и задач по программированию. Здесь размещено большое количество задач разного уровня сложности, которые помогают улучшить навыки программирования и подготовиться к техническим собеседованиям.",
    },
  ],
});
definePageMeta({ auth: true });
</script>

<template>
  <div class="home">
    <div class="home__container">
      <p class="home__about">
        <span>Кодчек</span> - это платформа для онлайн-практики алгоритмов и
        задач по программированию. Здесь размещено большое количество задач
        разного уровня сложности, которые помогают улучшить навыки
        программирования и подготовиться к техническим собеседованиям. Данный
        проект является свободно распространяемым!
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  margin-top: 2rem;
  &__container {
    margin: 0 auto;
    max-width: var(--width-container);
    padding-right: 1rem;
    padding-left: 1rem;
    height: 100vh;
  }
  &__about {
    font-size: 1.2rem;
    line-height: 150%;
    span {
      font-size: 2rem;
      font-weight: 600;
    }
  }
}
</style>
