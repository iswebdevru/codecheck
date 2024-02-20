export default defineEventHandler(async (event) => {
  const username = getRouterParam(event, "username");
  const users = await prisma.user.findFirst({
    where: {
      username: username,
    },
    orderBy: {
      solutions: {
        _count: "desc",
      },
    },

    include: {
      solutions: {
        where: { status: 0 },
        include: {
          challengeVariant: {
            include: {
              Challenge: {
                include: {
                  tags: true,
                  variants: {
                    include: {
                      lang: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
      _count: {
        select: {
          solutions: {
            where: {
              status: 0,
            },
          },
        },
      },
    },
  });
  return users;
});
