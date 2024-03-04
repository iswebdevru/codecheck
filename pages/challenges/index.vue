<script setup lang="ts">
import type { Challenge } from "@prisma/client";

useSeoMeta({
  title: "Задания",
  ogTitle: "Задания",
  description:
    "КодЧек - это платформа для онлайн-практики алгоритмов и задач по программированию. Здесь размещено большое количество задач разного уровня сложности, которые помогают улучшить навыки программирования и подготовиться к техническим собеседованиям.",
  ogDescription:
    "КодЧек - это платформа для онлайн-практики алгоритмов и задач по программированию. Здесь размещено большое количество задач разного уровня сложности, которые помогают улучшить навыки программирования и подготовиться к техническим собеседованиям.",
  ogImage: "https://кодчек.ркэ.рф/logo.png",
  ogType: "website",
});
const incomplete = ref(false);
const search = ref("");
const page = ref(1);
const fetchingChallenges = ref(false);
const { data: challenges } = await useFetch(
  () =>
    `/api/challenges/?name=${search.value}&incomplete=${incomplete.value}&page=${page.value}`,
  {
    onResponse: () => {
      fetchingChallenges.value = true;
    },
  }
);

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

const handlePaginate = () => {
  page.value += 1;
};

// const challengesSearched = computed(() => {
//   return challenges.value.filter((item: any) => {
//     return item.name.toLowerCase().indexOf(search.value.toLowerCase()) > -1;
//   });
// });

onMounted(() => {
  document.addEventListener("scroll", (e: any) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      console.log("Подгружаем ещё задания..");
      if (!fetchingChallenges.value) page.value += 1;
    }
  });
});
onUnmounted(() => {
  document.addEventListener("scroll", (e: any) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      console.log("Подгружаем ещё задания..");
      if (!fetchingChallenges.value) page.value += 1;
    }
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
        <div v-if="user" class="">
          <Checkbox
            input-id="incomplete"
            v-model="incomplete"
            :binary="true"
          ></Checkbox>
          <label for="incomplete"> Показать только нерешенные</label>
        </div>
      </div>
      <div class="challenges__body">
        <!-- <h1 class="">Задания</h1> -->
        <div class="challenges__items">
          <TransitionGroup name="fade">
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
              <div v-if="user?.role === 1" class="item__controls">
                <FormButton
                  @click.prevent="updateChallenge(item.id)"
                  background="var(--color-warning)"
                  color="var(--color-text-primary)"
                  >Редактировать</FormButton
                >
                <FormButton
                  @click.prevent="deleteChallenge(item.id)"
                  color="var(--color-text-primary)"
                  background="var(--color-danger)"
                  >Удалить</FormButton
                >
              </div>
            </div>
          </TransitionGroup>

          <!-- <FormButton
            @click.prevent="handlePaginate"
            v-if="challenges.length === 10"
            >Загрузить еще</FormButton
          > -->
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
    display: flex;
    flex-direction: column;
    gap: 1rem;
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
    grid-template-columns: minmax(250px, 1fr) 4fr;

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
    // font-weight: 200;

    font-size: 1.5rem;
    &:hover {
      text-decoration: 3px underline;
    }
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
