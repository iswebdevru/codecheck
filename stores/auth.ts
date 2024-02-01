import type { User } from "lucia";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  async function fetchUser() {
    user.value = await $fetch("/api/auth/user");
    console.log(user.value);
  }

  return { user, fetchUser };
});
