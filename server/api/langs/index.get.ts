export default defineEventHandler(async (event) => {
  const langs = await prisma.language.findMany({
    orderBy: {
      id: "asc",
    },
  });
  return langs;
});
