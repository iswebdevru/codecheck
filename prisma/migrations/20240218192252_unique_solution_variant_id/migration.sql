/*
  Warnings:

  - A unique constraint covering the columns `[challengeVariantId]` on the table `Solution` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Solution_challengeVariantId_key" ON "Solution"("challengeVariantId");
