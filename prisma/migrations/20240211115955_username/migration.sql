/*
  Warnings:

  - You are about to drop the column `userId` on the `Solution` table. All the data in the column will be lost.
  - Added the required column `username` to the `Solution` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Solution` DROP FOREIGN KEY `Solution_userId_fkey`;

-- AlterTable
ALTER TABLE `Solution` DROP COLUMN `userId`,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Solution` ADD CONSTRAINT `Solution_username_fkey` FOREIGN KEY (`username`) REFERENCES `User`(`username`) ON DELETE CASCADE ON UPDATE CASCADE;
