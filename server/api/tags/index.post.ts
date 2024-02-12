export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.name || event.context.user?.role !== 1 || !event.context.user)
    return;
  const tag = await prisma.tag.create({
    data: {
      name: body.name,
    },
  });
  return tag;
});
