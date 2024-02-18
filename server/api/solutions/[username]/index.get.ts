export default defineEventHandler(async (event) => {
  const username = getRouterParam(event, "username");

  const solution = await prisma.solution.findFirst({
    // orderBy: { createdAt: "desc" },
    where: {
      username: username,
    },
    include: {
      challengeVariant: true,
      user: true,
    },
  });
  return solution;
});
