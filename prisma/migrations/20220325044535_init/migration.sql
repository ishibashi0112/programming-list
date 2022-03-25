/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.
  - Made the column `name` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `url` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Post` MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `url` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Tag_name_key` ON `Tag`(`name`);
