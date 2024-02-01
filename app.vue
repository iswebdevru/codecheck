<script setup>
// const user = useUser();

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
