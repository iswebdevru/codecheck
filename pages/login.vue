<script setup lang="ts">
definePageMeta({
  middleware: "onlyguest",
});
const username = ref("");
const password = ref("");
const error = ref<string | null>(null);
const btnLoading = ref(true);
const { progress, isLoading, start, finish, clear } = useLoadingIndicator();
const submitForm = async () => {
  btnLoading.value = false;
  start();
  const result = await useFetch("/api/auth/login", {
    method: "POST",
    body: {
      username: username.value,
      password: password.value,
    },
  });

  if (result.error.value) {
    error.value = result.error.value.data?.message ?? null;
  } else {
    await navigateTo("/");
  }
  btnLoading.value = true;
  finish();
};

useHead({
  title: "Логин",
});

// const loginWithMoodle = () => {
//   navigateTo("/login/moodle/", { external: true });
// };
</script>

<template>
  <div class="form">
    <div class="form__container">
      <!-- {{ status }} -->
      <form @submit.prevent="submitForm" class="form__body">
        <h1 class="form__title">Авторизация</h1>

        <!-- <div class="form__item">
          <LabelInput for="user">Логин</LabelInput>
          <TextInput id="user" name="username" v-model="username"></TextInput>
        </div>
        <div class="form__item">
          <LabelInput for="pass">Пароль</LabelInput>
          <TextInput
            id="pass"
            type="password"
            name="password"
            v-model="password"
          ></TextInput>
        </div>

        <FormButton
          :loading="btnLoading"
          type="submit"
          :background="'var(--color-primary)'"
          >Войти</FormButton
        > -->
        <NuxtLink class="form__moodle" to="/login/moodle/" :external="true"
          >Войти с помощью д.ркэ.рф</NuxtLink
        >
        <p class="form__error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.form {
  margin-top: 2rem;
  &__moodle {
    background: var(--color-primary);
    color: var(--color-text-secondary);
    padding: 0.5rem 1rem;
    text-align: center;
    border-radius: var(--border-radius);
  }
  &__error {
    color: var(--color-danger);
  }
  &__title {
    font-size: 1.5rem;
  }
  &__container {
    display: grid;
    justify-content: center;
    align-items: center;
    // margin: 30vh auto 0 auto;
  }
  &__body {
    max-width: 220px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  &__item {
    display: flex;
    flex-direction: column;
    width: 100%;
    // align-items: baseline;
  }
}
</style>
