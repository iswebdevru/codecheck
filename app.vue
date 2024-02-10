<script setup>
import { Codemirror, install } from "vue-codemirror";
// const user = useUser();
const nuxtApp = useNuxtApp();
nuxtApp.vueApp.use(install, { extensions: [] });
// await callOnce(async () => {
//   user.value = await $fetch("/api/auth/user");
// });
</script>

<template>
  <NuxtLoadingIndicator :duration="10000" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
