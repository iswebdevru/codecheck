<script setup lang="ts">
import Dropdown from "primevue/dropdown";
const route = useRoute();
const roles = ref([
  {
    name: "Пользователь",
  },
  {
    name: "Админ",
  },
]);
const { data: user } = await useFetch(`/api/users/${route.params.username}`);

const selectedRole = ref();
selectedRole.value = roles.value[user.value.role];

const updateUser = async () => {
  // console.log(selectedRole.value);
  const data = await $fetch(`/api/users/` + route.params.username, {
    method: "PATCH",
    body: {
      role: roles.value.indexOf(selectedRole.value),
    },
  });
};

const { data: challenges } = await useFetch(
  `/api/users/${route.params.username}`
);
// roles.value[user.value.role]
</script>

<template>
  <div class="profile">
    <div class="profile__container">
      <div class="profile__left">
        <h1 class="profile__name">{{ user?.fio }}</h1>

        <h2 class="profile__username">{{ user?.username }}</h2>

        <span class="profile__email">{{ user?.email }}</span>

        <span class="profile__group">{{ user?.group }}</span>

        <hr />
        <Dropdown
          @change="updateUser"
          v-model="selectedRole"
          :options="roles"
          optionLabel="name"
        />
        <span>Решено: {{ challenges.solutions.length }}</span>
      </div>
      <div class="profile__right">
        <h1 class="profile__solution-title">Решенные задачи</h1>
        <div class="profile__solutions">
          <div
            v-for="item in challenges.solutions"
            :key="item.challengeVariant?.Challenge.id"
            class="challenges__item item"
          >
            <NuxtLink
              :to="`/challenges/${item.challengeVariant?.Challenge.id}`"
              class="item__title"
              >{{ item.challengeVariant.Challenge.name }}</NuxtLink
            >
            <p class="item__description">
              {{ item.challengeVariant?.Challenge.description }}
            </p>
            <div class="item__bottom">
              <div
                v-if="item.challengeVariant?.Challenge.tags"
                class="item__tags"
              >
                <span
                  v-for="tag in item.challengeVariant?.Challenge.tags"
                  :key="tag.challengeVariant?.Challenge.id"
                  class="item__tag"
                  >{{ tag.name }}</span
                >
              </div>
              <div class="item__langs">
                <img
                  class="item__lang-img"
                  v-for="lang in item.challengeVariant?.Challenge.variants"
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
.profile {
  &__name {
    font-weight: 500;
    font-size: 1.8rem;
  }
  &__username {
    font-weight: 400;
    color: var(--color-text-link);
  }
  &__email {
    color: var(--color-text-link);
  }
  &__group {
    color: var(--color-text-link);
  }
  &__container {
    margin: 0 auto;
    max-width: var(--width-container);
    padding-right: 1rem;
    padding-left: 1rem;
    display: flex;
    gap: 1rem;
    @media (max-width: 768px) {
      flex-direction: column;
    }
  }
  &__left {
    flex: 0 0 25%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    hr {
      padding: 0;
      height: 0;
      border: none;
      border-top: 1px solid var(--color-border-primary);
    }
  }
  &__right {
    flex: 1 1 75%;
  }
  &__solutions {
    display: grid;
    // grid-template-rows: auto;
    row-gap: 2rem;
  }
  &__solution-title {
    font-weight: 500;
    margin-bottom: 1rem;
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
