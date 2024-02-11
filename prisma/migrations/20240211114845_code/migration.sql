/*
  Warnings:

  - Added the required column `code` to the `Solution` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Solution` ADD COLUMN `code` TEXT NOT NULL;
