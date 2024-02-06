import { defineStore } from "pinia";

export const useChellengesStore = defineStore("challenges", () => {
  let challenges: any = reactive(new Map());
  let langs = ref<{ id: number; name: string }[]>([]);
  let currentLang = ref("");
  const currentChallenge = () => {
    return challenges.get(currentLang.value);
  };
  const initChallenges = async () => {
    const { data: fetchLangs } = await useFetch("/api/langs");
    langs.value = fetchLangs.value!;
    fetchLangs.value?.forEach((item) => {
      challenges.set(item.name, {
        mdInstructrion: "",
        test: "",
        code: "",
      });
    });
    currentLang.value = fetchLangs.value?.[0].name as string;
  };

  return { currentLang, initChallenges, challenges, currentChallenge, langs };
});
