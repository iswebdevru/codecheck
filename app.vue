<script setup>
// import "./assets/css/primevue/themes/codechecktheme/theme.scss";
import { Codemirror, install } from "vue-codemirror";
const nuxtApp = useNuxtApp();
nuxtApp.vueApp.use(install, { extensions: [] });

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - КодЧек` : "КодЧек";
  },
});
</script>

<template>
  <NuxtLoadingIndicator :duration="10000" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
