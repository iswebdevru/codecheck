export default defineEventHandler(async (event) => {
  const username = getRouterParam(event, "username");
  const id = getRouterParam(event, "id");

  const solution = await prisma.solution.findFirst({
    where: {
      user: {
        username: username,
      },
    },
    include: {
      challengeVariant: true,
      user: true,
    },
  });
  return solution;
});
