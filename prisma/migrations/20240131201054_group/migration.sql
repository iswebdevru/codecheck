/*
  Warnings:

  - Added the required column `group` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `group` VARCHAR(191) NOT NULL,
    MODIFY `role` INTEGER NOT NULL DEFAULT 0;
