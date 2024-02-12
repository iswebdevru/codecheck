import { ChallengeVariant } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const data = await readBody(event);
  if (!data || event.context.user?.role !== 1 || !event.context.user) return;

  let variants: ChallengeVariant[] = [];

  data.variants.forEach((item: any, index: any) => {
    // console.log(item);
    if (item.value.code || item.value.test || item.value.mdInstructrion) {
      variants.push({
        code: item.value.code,
        test: item.value.test,
        mdInstructrion: item.value.mdInstructrion,
        languageId: index + 1,
        id: item.value.id,
      });
    }
  });
  const challenge = await prisma.challenge.update({
    where: {
      id: Number(id),
    },
    data: {
      name: data.name,
      description: data.description,
      tags: {
        connect: data.tags,
      },
      // variants: {
      //   updateMany: {
      //     where: {
      //       id: variants.
      //     },
      //     data: variants,
      //   },
      // },
    },
  });

  // console.log(data.variants);
  variants.forEach(async (item) => {
    // console.log(item);
    if (!item.id) {
      await prisma.challengeVariant.create({
        data: {
          challengeId: Number(id),
          code: item.code,
          languageId: item.languageId,
          mdInstructrion: item.mdInstructrion,
          test: item.test,
        },
      });
    }
    await prisma.challengeVariant.update({
      where: {
        id: item.id,
      },
      data: {
        ...item,
      },
    });
  });
  return challenge;

  // return variants;
});
