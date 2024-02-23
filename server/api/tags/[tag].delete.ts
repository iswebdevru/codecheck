export default defineEventHandler(async (event) => {
  if (event.context.user?.role !== 1 || !event.context.user) return;
  const tagId = getRouterParam(event, "tag");
  const tag = await prisma.tag.delete({
    where: {
      id: Number(tagId),
    },
  });
  return tag;
});
