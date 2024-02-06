-- AlterTable
ALTER TABLE `ChallengeVariant` ADD COLUMN `challengeId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `ChallengeVariant` ADD CONSTRAINT `ChallengeVariant_challengeId_fkey` FOREIGN KEY (`challengeId`) REFERENCES `Challenge`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
