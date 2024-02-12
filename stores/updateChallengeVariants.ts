import { defineStore } from "pinia";

export const useUpdateVariantsStore = defineStore(
  "updateChallengeVariants",
  () => {
    let challenges: any = reactive({});
    let chellengeLangs = ref<{ id: number; name: string }[]>([]);
    let currentLang = ref("");
    // let langs = ref([]);

    const currentChallenge = () => {
      return challenges[currentLang.value];
    };
    let challenge = ref();

    const initChallengeVariants = async (id: string) => {
      const { data: fetchChallenge } = await useFetch(`/api/challenges/${id}`);
      // let langss: any = [];
      challenge.value = fetchChallenge.value;

      fetchChallenge.value.variants.forEach((item: any) => {
        // langss.push(item.lang);
        challenges[item.lang.name] = {
          mdInstructrion: item.mdInstructrion,
          test: item.test,
          code: item.code,
          id: item.id,
        };
      });
      chellengeLangs.value.forEach((item) => {
        if (!challenges[item.name]) {
          challenges[item.name] = {
            mdInstructrion: "",
            test: "",
            code: "",
            id: null,
          };
        }
      });

      currentLang.value = chellengeLangs.value?.[0].name as string;
    };
    const initLangs = async () => {
      const { data: fetchLangs } = await useFetch("/api/langs");
      chellengeLangs.value = fetchLangs.value;
    };

    return {
      currentLang,
      initChallengeVariants,
      challenges,
      currentChallenge,
      chellengeLangs,
      challenge,
      initLangs,
    };
  }
);
