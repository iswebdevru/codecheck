export default defineEventHandler(async (event) => {
  const langs = await prisma.tag.findMany();
  return langs;
});
