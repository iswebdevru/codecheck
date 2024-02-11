export default defineEventHandler(async (event) => {
  const username = getRouterParam(event, "username");
  const data = await readBody(event);

  const solution = await prisma.solution.create({
    data: {
      code: data.code,
      challengeVariantId: data.variantId,
      username: username as string,
    },
    include: {
      challengeVariant: true,
      user: true,
    },
  });
  return solution;
});
