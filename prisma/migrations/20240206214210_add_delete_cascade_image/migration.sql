-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_propertieId_fkey";

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_propertieId_fkey" FOREIGN KEY ("propertieId") REFERENCES "Propertie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
