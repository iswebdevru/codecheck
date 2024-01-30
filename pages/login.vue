<script setup lang="ts">
const username = ref("");
const password = ref("");
</script>

<template>
  <div class="form">
    <div class="form__container">
      <form class="form__body">
        <div class="form__item">
          <LabelInput for="test">Логин</LabelInput>
          <TextInput id="test" name="username" v-model="username"></TextInput>
        </div>
        <div class="form__item">
          <LabelInput for="test">Пароль</LabelInput>
          <TextInput id="test" name="password" v-model="password"></TextInput>
        </div>
        <FormButton :background="'var(--color-primary)'">Войти</FormButton>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.form {
  &__container {
    margin: 30vh auto 0 auto;
    max-width: 220px;
  }
  &__body {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  &__item {
    display: flex;
    flex-direction: column;
    // align-items: baseline;
  }
}
</style>
