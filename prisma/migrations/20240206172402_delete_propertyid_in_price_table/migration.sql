/*
  Warnings:

  - You are about to drop the column `propertyId` on the `Price` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Price_propertyId_key";

-- AlterTable
ALTER TABLE "Price" DROP COLUMN "propertyId";
