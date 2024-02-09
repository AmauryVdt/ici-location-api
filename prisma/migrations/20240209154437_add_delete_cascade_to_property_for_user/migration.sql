-- DropForeignKey
ALTER TABLE "Propertie" DROP CONSTRAINT "Propertie_userId_fkey";

-- AddForeignKey
ALTER TABLE "Propertie" ADD CONSTRAINT "Propertie_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
