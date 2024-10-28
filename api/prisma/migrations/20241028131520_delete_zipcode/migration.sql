/*
  Warnings:

  - You are about to drop the column `zipcode` on the `City` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "City_zipcode_key";

-- AlterTable
ALTER TABLE "City" DROP COLUMN "zipcode";
