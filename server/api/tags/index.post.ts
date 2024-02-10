export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body.name) return;
  const tag = await prisma.tag.create({
    data: {
      name: body.name,
    },
  });
  return tag;
});
