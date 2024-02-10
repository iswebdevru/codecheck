export default defineEventHandler(async (event) => {
  const challenges = await prisma.challenge.findMany({
    include: {
      tags: true,
      variants: {
        include: {
          lang: true,
        },
      },
      // variants: {
      //   include: {
      //     lang: true,
      //   },
      // },
    },
  });
  return challenges;
});
