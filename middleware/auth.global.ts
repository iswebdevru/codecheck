import { callWithNuxt } from "#app/nuxt";
import { useNuxtApp } from "#imports";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const nuxtApp = useNuxtApp();
  // if (process.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered)
  //   return;
  // const { fetchUser, user } = useAuthStore();
  // await fetchUser();

  const user = useUser();
  const { data, error } = await callWithNuxt<any>(nuxtApp, useFetch, [
    "/api/auth/user",
  ]);
  if (error.value) throw createError("Failed to fetch data");
  user.value = data.value ?? null;

  // user.value = await $fetch("/api/auth/user");
  // user.value = await $fetch("/api/auth/user");
});
