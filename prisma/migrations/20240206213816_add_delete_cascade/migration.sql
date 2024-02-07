-- DropForeignKey
ALTER TABLE "ApartmentDetail" DROP CONSTRAINT "ApartmentDetail_id_fkey";

-- DropForeignKey
ALTER TABLE "HouseDetail" DROP CONSTRAINT "HouseDetail_id_fkey";

-- DropForeignKey
ALTER TABLE "LandDetail" DROP CONSTRAINT "LandDetail_id_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_propertieId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_userId_fkey";

-- DropForeignKey
ALTER TABLE "OtherDetail" DROP CONSTRAINT "OtherDetail_id_fkey";

-- DropForeignKey
ALTER TABLE "ParkingDetail" DROP CONSTRAINT "ParkingDetail_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "Price" DROP CONSTRAINT "Price_id_fkey";

-- AddForeignKey
ALTER TABLE "HouseDetail" ADD CONSTRAINT "HouseDetail_id_fkey" FOREIGN KEY ("id") REFERENCES "Propertie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApartmentDetail" ADD CONSTRAINT "ApartmentDetail_id_fkey" FOREIGN KEY ("id") REFERENCES "Propertie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LandDetail" ADD CONSTRAINT "LandDetail_id_fkey" FOREIGN KEY ("id") REFERENCES "Propertie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParkingDetail" ADD CONSTRAINT "ParkingDetail_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Propertie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OtherDetail" ADD CONSTRAINT "OtherDetail_id_fkey" FOREIGN KEY ("id") REFERENCES "Propertie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_id_fkey" FOREIGN KEY ("id") REFERENCES "Propertie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_propertieId_fkey" FOREIGN KEY ("propertieId") REFERENCES "Propertie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
