export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useUser();
  if (user.value?.role !== 1) return navigateTo("/profile");
});
