export default defineEventHandler(async (event) => {
  const username = getRouterParam(event, "username");
  const data = await readBody(event);
  if (!event.context.user) return;

  const solution = await prisma.solution.upsert({
    where: {
      challengeVariantId_username: {
        challengeVariantId: data.variantId,
        username: username as string,
      },
    },

    create: {
      code: data.code,
      challengeVariantId: data.variantId,
      username: username as string,
      status: data.status,
    },
    update: {
      code: data.code,
      challengeVariantId: data.variantId,
    },
    // include: {
    //   challengeVariant: true,
    //   user: true,
    // },
  });
  return solution;
});
