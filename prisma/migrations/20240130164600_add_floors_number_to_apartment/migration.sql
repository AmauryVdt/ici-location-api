/*
  Warnings:

  - You are about to drop the column `floor` on the `HouseDetail` table. All the data in the column will be lost.
  - Added the required column `floorsNumber` to the `ApartmentDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ApartmentDetail" ADD COLUMN     "floorsNumber" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "HouseDetail" DROP COLUMN "floor";
