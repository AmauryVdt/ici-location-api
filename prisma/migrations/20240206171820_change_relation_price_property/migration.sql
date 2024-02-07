/*
  Warnings:

  - You are about to drop the column `priceId` on the `Propertie` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[propertyId]` on the table `Price` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `propertyId` to the `Price` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Propertie" DROP CONSTRAINT "Propertie_priceId_fkey";

-- DropIndex
DROP INDEX "Propertie_priceId_key";

-- AlterTable
ALTER TABLE "Price" ADD COLUMN     "propertyId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Propertie" DROP COLUMN "priceId";

-- CreateIndex
CREATE UNIQUE INDEX "Price_propertyId_key" ON "Price"("propertyId");

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_id_fkey" FOREIGN KEY ("id") REFERENCES "Propertie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
