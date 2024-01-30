<script setup lang="ts">
const { signIn, token, data, status, lastRefreshedAt } = useAuth();
const username = ref("");
const password = ref("");
definePageMeta({
  // unauthenticatedOnly: true,
  // navigateAuthenticatedTo: '/'
  middleware: "unauthenticated-only",
});
</script>

<template>
  <div class="form">
    <div class="form__container">
      <!-- {{ status }} -->
      <form
        @submit.prevent="
          signIn({ username, password }, { callbackUrl: '/profile' })
        "
        class="form__body"
      >
        <h1 class="form__title">Авторизация</h1>
        <div class="form__item">
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
        <FormButton type="submit" :background="'var(--color-primary)'"
          >Войти</FormButton
        >
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.form {
  margin-top: 2rem;
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
    // align-items: baseline;
  }
}
</style>
