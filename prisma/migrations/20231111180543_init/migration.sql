-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis";

-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis_topology";

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "avatar" TEXT,
    "identity" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "addressId" UUID NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Propertie" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(50) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "energyClass" INTEGER NOT NULL,
    "ges" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "addressId" UUID NOT NULL,
    "priceId" UUID NOT NULL,

    CONSTRAINT "Propertie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HouseDetail" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "furnished" BOOLEAN NOT NULL,
    "livingArea" INTEGER NOT NULL,
    "totalArea" INTEGER NOT NULL,
    "rooms" INTEGER NOT NULL,
    "floorsNumber" INTEGER NOT NULL,
    "floor" INTEGER NOT NULL,
    "balcony" BOOLEAN NOT NULL,
    "terrace" BOOLEAN NOT NULL,
    "garden" BOOLEAN NOT NULL,
    "parking" INTEGER NOT NULL,

    CONSTRAINT "HouseDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApartmentDetail" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "furnished" BOOLEAN NOT NULL,
    "livingArea" INTEGER NOT NULL,
    "rooms" INTEGER NOT NULL,
    "floor" INTEGER NOT NULL,
    "lift" BOOLEAN NOT NULL,
    "balcony" BOOLEAN NOT NULL,
    "terrace" BOOLEAN NOT NULL,
    "garden" BOOLEAN NOT NULL,
    "parking" INTEGER NOT NULL,

    CONSTRAINT "ApartmentDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LandDetail" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "totalArea" INTEGER NOT NULL,

    CONSTRAINT "LandDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParkingDetail" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "parking" INTEGER NOT NULL,

    CONSTRAINT "ParkingDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OtherDetail" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "furnished" BOOLEAN NOT NULL,
    "livingArea" INTEGER NOT NULL,
    "totalArea" INTEGER NOT NULL,
    "rooms" INTEGER NOT NULL,
    "lift" BOOLEAN NOT NULL,
    "floorsNumber" INTEGER NOT NULL,
    "floor" INTEGER NOT NULL,
    "balcony" BOOLEAN NOT NULL,
    "terrace" BOOLEAN NOT NULL,
    "garden" BOOLEAN NOT NULL,
    "parking" INTEGER NOT NULL,

    CONSTRAINT "OtherDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "coordinate" geography(Point,4326) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Price" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "price" INTEGER NOT NULL,

    CONSTRAINT "Price_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "propertieId" UUID NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "like" (
    "id" SERIAL NOT NULL,
    "userId" UUID NOT NULL,
    "propertieId" UUID NOT NULL,

    CONSTRAINT "like_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "location_idx" ON "Address" USING GIST ("coordinate");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Propertie" ADD CONSTRAINT "Propertie_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Propertie" ADD CONSTRAINT "Propertie_priceId_fkey" FOREIGN KEY ("priceId") REFERENCES "Price"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HouseDetail" ADD CONSTRAINT "HouseDetail_id_fkey" FOREIGN KEY ("id") REFERENCES "Propertie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApartmentDetail" ADD CONSTRAINT "ApartmentDetail_id_fkey" FOREIGN KEY ("id") REFERENCES "Propertie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LandDetail" ADD CONSTRAINT "LandDetail_id_fkey" FOREIGN KEY ("id") REFERENCES "Propertie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParkingDetail" ADD CONSTRAINT "ParkingDetail_id_fkey" FOREIGN KEY ("id") REFERENCES "Propertie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OtherDetail" ADD CONSTRAINT "OtherDetail_id_fkey" FOREIGN KEY ("id") REFERENCES "Propertie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_propertieId_fkey" FOREIGN KEY ("propertieId") REFERENCES "Propertie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_propertieId_fkey" FOREIGN KEY ("propertieId") REFERENCES "Propertie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
