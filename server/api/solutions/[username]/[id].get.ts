export default defineEventHandler(async (event) => {
  const username = getRouterParam(event, "username");
  const id = getRouterParam(event, "id");

  // const solution = await prisma.solution.findFirst({
  //   where: {
  //     challengeVariantId: Number(id),
  //     username: username,
  //   },
  //   include: {
  //     challengeVariant: {
  //       include: {
  //         lang: true,
  //       },
  //     },
  //     user: true,
  //   },
  // });

  const solution = await prisma.challenge.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      variants: {
        include: {
          lang: true,
          Solutions: {
            where: {
              username: username,
            },
          },
        },
      },
    },
  });

  return solution;
});
