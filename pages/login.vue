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
  title: "Авторизация",
});
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
        <NuxtLink class="form__moodle" to="/login/moodle/" :external="true">
          <!-- <svg
            width="100%"
            height="100%"
            viewBox="0 0 81 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_7_14)">
              <path
                d="M32.3022 0.218506H19.8213L0.20874 16.5254V27.3965L20.3562 44.9969H32.3022L6.53795 21.788L32.3022 0.218506Z"
                fill="#F43F5E"
              />
              <path
                d="M35.9576 0.218506H48.616L23.0309 21.4428L49.2401 44.9969H36.1359L10.1934 21.6154L35.9576 0.218506Z"
                fill="#F43F5E"
              />
              <path
                d="M40.5928 16.9568H61.7847C62.453 16.9568 63.0939 17.2135 63.5667 17.6705C64.0395 18.1275 64.3056 18.7475 64.3064 19.3942V25.4737C64.3064 26.1209 64.0408 26.7417 63.5679 27.1993C63.0949 27.657 62.4535 27.9142 61.7847 27.9142H40.5928V16.9568Z"
                fill="#3B82F6"
              />
              <path
                d="M56.9999 0H53.1629L40.6354 10.8314H55.481C58.6482 10.8314 61.6856 12.0491 63.9252 14.2165C66.1647 16.3839 67.4229 19.3236 67.4229 22.3888C67.4229 25.454 66.1647 28.3936 63.9252 30.5611C61.6856 32.7285 58.6482 33.9461 55.481 33.9461H41.5899L53.5073 45.0008H57.6698C70.3241 45.0008 80.5827 35.0726 80.5827 22.8257C80.5827 10.2195 70.0231 0 56.9999 0Z"
                fill="#3B82F6"
              />
            </g>
            <defs>
              <clipPath id="clip0_7_14">
                <rect
                  width="80.3739"
                  height="45"
                  fill="white"
                  transform="translate(0.20874)"
                />
              </clipPath>
            </defs>
          </svg> -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 48 48"
          >
            <path
              fill="#ffab40"
              d="M33.5,16c-2.5,0-4.8,1-6.5,2.6C25.3,17,23,16,20.5,16c-5.2,0-9.5,4.3-9.5,9.5V37h6V24.5 c0-1.9,1.6-3.5,3.5-3.5s3.5,1.6,3.5,3.5V37h6V24.5c0-1.9,1.6-3.5,3.5-3.5s3.5,1.6,3.5,3.5V37h6V25.5C43,20.3,38.7,16,33.5,16z"
            ></path>
            <path d="M5.5 16.2H6.5V32H5.5z"></path>
            <path
              fill="#424242"
              d="M22,13c1.1,0.4,2.6,2,3,3c-1.8,1.7-2.6,2.9-3,6c-0.1,1.1-0.9,1.7-2,1c-3.1-1.9-6-2-8-2 c-1-1-0.5-3.7,0-5l6,1L22,13z"
            ></path>
            <path fill="#616161" d="M18,17H4l11-7h14L18,17z"></path>
            <path
              fill="#424242"
              d="M7.5,30c0-2.2-0.7-4-1.5-4s-1.5,1.8-1.5,4s0.7,4,1.5,4S7.5,32.2,7.5,30z"
            ></path>
          </svg>
          <span>Войти с помощью <b>д.ркэ.рф</b></span></NuxtLink
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
    & > svg {
      flex: 0 1 60px;
    }
    display: flex;
    gap: 0.5rem;
    align-items: center;
    // background: var(--color-primary);
    // color: var(--color-text-secondary);
    padding: 0.5rem 1rem;
    // text-align: center;
    border: 1px solid var(--color-border-primary);
    border-radius: 1rem;
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
    padding-left: 15px;
    padding-right: 15px;
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
