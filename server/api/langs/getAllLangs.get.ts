export default defineEventHandler(async (event) => {
  const langs = await prisma.language.findMany();
  return langs;
});
