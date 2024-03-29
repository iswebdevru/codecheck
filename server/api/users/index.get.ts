export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  let page = Number(query.page) ? Number(query.page) : 0;
  const [count, items] = await prisma.$transaction([
    prisma.user.count(),
    prisma.user.findMany({
      skip: 10 * page,
      take: 10,
      orderBy: {
        id: "desc",
      },
      include: {
        _count: {
          select: {
            solutions: true,
          },
        },
      },
    }),
  ]);
  return { count, users: items };
});
