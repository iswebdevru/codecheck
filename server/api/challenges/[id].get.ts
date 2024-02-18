export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const challenge = await prisma.challenge.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      tags: true,
      variants: {
        orderBy: {
          languageId: "asc",
        },
        include: {
          lang: true,
        },
      },
    },
  });
  return challenge || "Not found";
});
