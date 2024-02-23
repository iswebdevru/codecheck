export default defineEventHandler(async (event) => {
  if (event.context.user?.role !== 1 || !event.context.user) return;
  const username = getRouterParam(event, "username");
  const body = await readBody(event);
  const user = await prisma.user.update({
    where: {
      username: username,
    },
    data: {
      email: body?.email,
      fio: body?.fio,
      group: body?.group,
      role: body?.role,
    },
  });
  return user;
});
