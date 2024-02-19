export default defineEventHandler(async (event) => {
  const users = await prisma.user.findMany({
    orderBy: {
      solutions: {
        _count: "desc",
      },
    },
    take: 10,
    include: {
      solutions: {
        where: {
          status: 0,
        },
        include: {
          challengeVariant: {
            include: {
              Challenge: true,
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
