import { callWithNuxt } from "#app/nuxt";
import { useNuxtApp } from "#imports";

export default defineNuxtRouteMiddleware(async (to, from) => {
  // const nuxtApp = useNuxtApp();
  // const user = useUser();
  // const { user } = useAuthStore();
  // console.log(user);
  // if (!user) {
  //   return await navigateTo("/login");
  // }
  const user = useUser();
  if (!user.value) return navigateTo("/login");
});
