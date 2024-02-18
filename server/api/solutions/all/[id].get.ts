export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const id = getRouterParam(event, "id");
  // const solutions = await prisma.solution.findMany({
  //   // distinct: "username",
  //   orderBy: {
  //     createdAt: "desc",
  //   },
  //   where: {
  //     challengeVariantId: Number(id),
  //     challengeVariant: {
  //       lang: {
  //         name: query.lang?.toString(),
  //       },
  //     },
  //   },
  //   include: {
  //     challengeVariant: true,
  //     user: true,
  //   },
  // });
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
