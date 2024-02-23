export default defineEventHandler(async (event) => {
  if (event.context.user?.role !== 1 || !event.context.user) return;
  const id = getRouterParam(event, "username");
  const user = await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });
  return user;
});
