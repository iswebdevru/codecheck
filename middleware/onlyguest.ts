import { callWithNuxt } from "#app/nuxt";
import { useNuxtApp } from "#imports";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useUser();
  // user.value = await $fetch("/api/auth/user");

  // console.log(user.value);
  if (user.value) return navigateTo("/profile");
});
