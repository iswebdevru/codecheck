export default defineEventHandler(async (event) => {
  const users = await prisma.user.findMany({
    include: {
      solutions: true,
    },
  });
  return users;
});
