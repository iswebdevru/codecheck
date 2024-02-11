/*
  Warnings:

  - You are about to drop the column `language` on the `Solution` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `ChallengeVariant` DROP FOREIGN KEY `ChallengeVariant_challengeId_fkey`;

-- AlterTable
ALTER TABLE `Solution` DROP COLUMN `language`;

-- AddForeignKey
ALTER TABLE `ChallengeVariant` ADD CONSTRAINT `ChallengeVariant_challengeId_fkey` FOREIGN KEY (`challengeId`) REFERENCES `Challenge`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
