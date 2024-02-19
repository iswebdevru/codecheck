export default defineEventHandler(async (event) => {
  const users = await prisma.user.findMany({
    take: 10,
    orderBy: {
      solutions: {
        _count: "desc",
      },
    },
    include: {
      _count: {
        select: {
          solutions: true,
        },
      },
    },
  });
  return users;
});
