import { defineStore } from "pinia";

export const useChellengeVariantsStore = defineStore(
  "challengeVariants",
  () => {
    let challenges: any = reactive({});
    let langs = ref<{ id: number; name: string }[]>([]);
    let currentLang = ref("");
    const currentChallenge = () => {
      return challenges[currentLang.value];
    };
    let challenge = ref();
    // const currentChallenge = computed(() => {
    //   return challenges[currentLang.value];
    // });
    const initChallengeVariants = async (id: string) => {
      const { data: fetchChallenge } = await useFetch(`/api/challenges/${id}`);
      // const { data: fetchLangs } = await useFetch("/api/challenges/");
      let langss: any = [];
      challenge.value = fetchChallenge.value;
      // challenge.value.variants?.forEach((item: any) => {
      //   console.log(item);
      // });
      fetchChallenge.value.variants.forEach((item: any) => {
        // console.log(item.lang);
        langss.push(item.lang);
        challenges[item.lang.name] = {
          mdInstructrion: item.mdInstructrion,
          test: item.test,
          code: item.code,
        };
      });
      langs.value = langss;
      currentLang.value = langs.value?.[0].name as string;
    };

    return {
      currentLang,
      initChallengeVariants,
      challenges,
      currentChallenge,
      langs,
      challenge,
    };
  }
);
