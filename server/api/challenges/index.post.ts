import { ChallengeVariant } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const data = await readBody(event);
  if (!data) return;

  let variants: ChallengeVariant[] = [];

  data.variants.forEach((item: any, index: any) => {
    // console.log(item);
    if (item.value.code || item.value.test || item.value.mdInstructrion) {
      variants.push({
        code: item.value.code,
        test: item.value.test,
        mdInstructrion: item.value.mdInstructrion,
        languageId: index + 1,
      });
    }
  });
  const challenge = await prisma.challenge.create({
    data: {
      name: data.name,
      description: data.description,
      tags: {
        connect: data.tags,
      },
      variants: {
        createMany: {
          data: variants,
        },
      },
    },
  });
  return challenge;

  // return variants;
});
