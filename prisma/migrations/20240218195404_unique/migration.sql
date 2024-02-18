/*
  Warnings:

  - A unique constraint covering the columns `[challengeVariantId,username]` on the table `Solution` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Solution_challengeVariantId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Solution_challengeVariantId_username_key" ON "Solution"("challengeVariantId", "username");
