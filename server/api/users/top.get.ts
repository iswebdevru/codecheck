export default defineEventHandler(async (event) => {
  const users =
    await prisma.$queryRaw`SELECT  "User".fio, COUNT("Solution".id) AS solutions FROM "User" LEFT JOIN "Solution"  ON "User".username="Solution".username WHERE "Solution".status=0 GROUP BY "User".fio, "User".username ORDER BY solutions DESC LIMIT 50;`;
  // That's JavaScript moment and that's not defaut
  //
  return JSON.parse(
    JSON.stringify(users, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
});
