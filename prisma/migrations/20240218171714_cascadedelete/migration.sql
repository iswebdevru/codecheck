-- DropForeignKey
ALTER TABLE "Solution" DROP CONSTRAINT "Solution_challengeVariantId_fkey";

-- AddForeignKey
ALTER TABLE "Solution" ADD CONSTRAINT "Solution_challengeVariantId_fkey" FOREIGN KEY ("challengeVariantId") REFERENCES "ChallengeVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
