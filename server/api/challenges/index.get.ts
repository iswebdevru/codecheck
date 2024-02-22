export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  let page = Number(query.page) ? Number(query.page) : 1;

  const challenges = await prisma.challenge.findMany({
    take: 10 * page,
    // skip:,
    where: {
      name: {
        contains: query.name,
      },
      variants:
        query.incomplete === "true"
          ? {
              some: {
                Solutions: {
                  none: {
                    status: {
                      in: [0, 1],
                    },
                    username: event.context.user?.username,
                  },
                },
              },
            }
          : undefined,
    },
    include: {
      tags: true,
      variants: {
        include: {
          lang: true,
        },
      },
      // variants: {
      //   include: {
      //     lang: true,
      //   },
      // },
    },
  });
  return challenges;
});
