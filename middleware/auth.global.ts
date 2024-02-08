export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useUser();
  // const { data, error } = await useAsyncData(
  //   "asdf",
  //   async () => await $fetch("/api/auth/user")
  // );
  const { data, error } = await useFetch("/api/auth/user");
  if (data.value) {
    user.value = data.value;
  }
});
