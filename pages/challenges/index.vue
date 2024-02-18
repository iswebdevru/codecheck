<script setup lang="ts">
import type { Challenge } from "@prisma/client";

useHead({
  title: "Задания",
});
const { data: challenges } = await useFetch("/api/challenges");

const user = useUser();
const deleteChallenge = async (id: number) => {
  const data = await $fetch(`/api/challenges/${id}`, {
    method: "DELETE",
  });
  if (data) {
    challenges.value = challenges.value.filter((el: Challenge) => {
      return el.id !== id;
    });
  }
};
const updateChallenge = (id: number) => {
  navigateTo(`/challenges/edit/${id}`);
};

const search = ref("");

const challengesSearched = computed(() => {
  return challenges.value.filter((item: any) => {
    return item.name.toLowerCase().indexOf(search.value.toLowerCase()) > -1;
  });
});
</script>

<template>
  <div class="challenges">
    <div class="challenges__container">
      <div class="challenges__aside">
        <TextInput
          placeholder="Поиск по названию"
          v-model="search"
          name="search"
          id="search"
        ></TextInput>
      </div>
      <div class="challenges__body">
        <!-- <h1 class="">Задания</h1> -->
        <div class="challenges__items">
          <TransitionGroup name="fade">
            <div
              v-for="item in challengesSearched"
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
              <div v-if="user?.role === 1" class="item__controls">
                <FormButton
                  @click.prevent="updateChallenge(item.id)"
                  background="var(--color-warning)"
                  color="var(--color-text-primary)"
                  >Редактировать</FormButton
                >
                <FormButton
                  @click.prevent="deleteChallenge(item.id)"
                  background="var(--color-danger)"
                  >Удалить</FormButton
                >
              </div>
            </div>
          </TransitionGroup>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
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
    grid-template-columns: 1fr 3fr;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
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
  &__controls {
    margin-top: 1rem;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    button {
      width: auto;
    }
  }
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
    color: var(--color-text-primary);
    // text-decoration: underline;
    // font-weight: 200;

    font-size: 1.5rem;
  }
  &__description {
    margin-top: 1rem;
    font-size: 1rem;
  }
  &__tag {
    background: #52525b;
    color: white;
    font-size: 0.8rem;
    padding: 0.4rem;
    border-radius: 0.3rem;
  }
  &__tags {
    display: flex;
    gap: 0.5rem;
  }
}
</style>
