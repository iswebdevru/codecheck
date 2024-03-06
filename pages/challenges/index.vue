<script setup lang="ts">
import type { Challenge } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/vue-query";
import { TransitionGroup } from "vue";

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
const page = ref(0);
const fetchingChallenges = ref(true);
const refChallenges = ref();

const { data: challenges, pending } = await useFetch(
  () =>
    `/api/challenges/?name=${search.value}&incomplete=${incomplete.value}&page=${page.value}`,
  {
    onResponse: (data) => {
      if (data.response._data.length < 10) {
        fetchingChallenges.value = false;
        return;
      }

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

const challengesFetcher = async (
  { pageParam = 0 },
  search: Ref<string>,
  incomplete: Ref<boolean>
) => {
  const data = await $fetch(
    `/api/challenges/?name=${search.value}&incomplete=${incomplete.value}&page=${pageParam}`
  );

  return {
    pageData: data || [],
    cursor: pageParam + 1,
  };
};

const { data, fetchNextPage, hasNextPage, isFetching, isLoading, suspense } =
  useInfiniteQuery({
    initialPageParam: 0,
    queryKey: ["challenges", search, incomplete],
    queryFn: (data) => challengesFetcher(data, search, incomplete),
    getNextPageParam: (lastPage) => {
      return lastPage.cursor;
    },
  });

function intersectionObserver() {
  const { stop } = useIntersectionObserver(
    () => refChallenges.value[refChallenges.value.length - 1],
    ([{ isIntersecting }], observerElement) => {
      if (isIntersecting && refChallenges.value.length % 10 === 0)
        fetchNextPage(), stop(), intersectionObserver();
    }
  );
}
watch(refChallenges, () => {
  intersectionObserver();
});

onServerPrefetch(async () => {
  await suspense();
});

const mounted = ref(false);
const component = computed(() => (mounted.value ? TransitionGroup : "div"));
onMounted(() => {
  mounted.value = true;
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
        <div class="challenges__items">
          <component :is="component" tag="div" name="fade">
            <template v-for="(page, index) in data?.pages" :key="index">
              <div
                ref="refChallenges"
                v-for="item in page.pageData"
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
                      :alt="lang.lang.name"
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
            </template>
          </component>
          <div v-show="isLoading" class="challenges__loader">
            <span class="loader"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.loader {
  width: 2rem;
  height: 2rem;
  border-width: 2px;
  border-style: solid;
  // position: absolute;
  // border: 5px solid black;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.challenges {
  &__loader {
    display: flex;
    justify-content: center;
  }
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
  //
  &__items > div {
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
