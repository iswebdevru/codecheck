export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const solutions = await prisma.solution.findMany({
    where: {
      challengeVariantId: Number(id),
    },
    include: {
      challengeVariant: true,
      user: true,
    },
  });
  return solutions;
});
