export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const solutions = await prisma.challengeVariant.findFirst({
    where: {
      id: Number(id),
    },

    include: {
      lang: true,
      Solutions: {
        orderBy: { updatedAt: "desc" },
        where: {
          status: 0,
        },
        include: {
          user: true,
        },
      },
    },
  });
  return solutions;
});
