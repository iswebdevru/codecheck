export default defineEventHandler(async (event) => {
  if (event.context.user?.role !== 1 || !event.context.user) return;
  const id = getRouterParam(event, "id");
  const challenge = await prisma.challenge.delete({
    where: {
      id: Number(id),
    },
  });
  return challenge;
});
