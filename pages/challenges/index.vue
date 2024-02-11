<script setup lang="ts">
useHead({
  title: "Задания",
});
const { data: challenges } = await useFetch("/api/challenges");
console.log(challenges.value);
</script>

<template>
  <div class="challenges">
    <div class="challenges__container">
      <div class="challenges__aside">
        <TextInput placeholder="Поиск" model-value="" name="" id=""></TextInput>
      </div>
      <div class="challenges__body">
        <!-- <h1 class="">Задания</h1> -->
        <div class="challenges__items">
          <div
            v-for="item in challenges"
            :key="item.id"
            class="challenges__item item"
          >
            <NuxtLink :to="`/challenges/${item.id}`" class="item__title">{{
              item.name
            }}</NuxtLink>
            <p class="item__description">{{ item.description }}</p>
            <div class="item__bottom">
              <div v-if="item.tags" class="item__tags">
                <span
                  v-for="tag in item.tags"
                  :key="tag.id"
                  class="item__tag"
                  >{{ tag.name }}</span
                >
              </div>
              <div class="item__langs">
                <img
                  class="item__lang-img"
                  v-for="lang in item.variants"
                  :src="`/langs/${lang.lang.name?.toLowerCase()}.svg`"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.challenges {
  &__aside {
    // box-shadow: 0 0 10px rgba(0, 0, 0, 0.086);
    // border-radius: var(--border-radius);
    padding: 1rem 1rem;
  }
  &__body {
  }
  &__container {
    margin: 0 auto;
    max-width: var(--width-container);

    padding-right: 1rem;
    padding-left: 1rem;
    display: grid;
    grid-template-columns: 1fr 4fr;
    // gap: 2rem;
  }
  &__items {
    display: grid;
    // grid-template-rows: auto;
    row-gap: 2rem;
  }
}

.item {
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.086);
  &__bottom {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__langs {
    display: flex;
    gap: 0.5rem;
  }
  &__lang-img {
    width: 1.2rem;
    height: 1.2rem;
  }
  &__title {
    color: black;
    font-size: 2rem;
  }
  &__description {
    margin-top: 1rem;
    font-size: 1rem;
  }
  &__tag {
    background: black;
    color: white;
    font-size: 0.9rem;
    padding: 0.4rem;
    border-radius: 0.3rem;
  }
  &__tags {
    display: flex;
    gap: 0.5rem;
  }
}
</style>
