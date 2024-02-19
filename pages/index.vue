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
      <div class="home__img">
        <img src="@/assets/img/home.svg" alt="" />
      </div>
      <p class="home__about">
        <h1>Простой и эффективный способ, основанный на практике</h1>
        <span>КодЧек</span> - это платформа для онлайн-практики алгоритмов и
        задач по программированию. Здесь размещено большое количество задач
        разного уровня сложности, которые помогают улучшить навыки
        программирования и подготовиться к техническим собеседованиям. <br />
        Данный проект является свободно распространяемым! Специально для
        Рязанского Колледжа Электроники.
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  margin-top: 2rem;
  &__img {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    margin: 0 auto;
    max-width: var(--width-container);
    padding-right: 1rem;
    padding-left: 1rem;
    height: 100%;
    align-items: center;
  }
  &__about {
    font-size: 1.2rem;
    line-height: 150%;

    h1{
      line-height: 100%;
    }
    span {
      // font-size: 2rem;
      font-weight: 600;
    }
  }
}
</style>
