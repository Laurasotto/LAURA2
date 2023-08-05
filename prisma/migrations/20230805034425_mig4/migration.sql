/*
  Warnings:

  - You are about to drop the column `id_raza` on the `Granja` table. All the data in the column will be lost.
  - You are about to drop the column `id_granja` on the `Granja_Distribuidor` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Granja" DROP CONSTRAINT "Granja_id_raza_fkey";

-- DropForeignKey
ALTER TABLE "Granja_Distribuidor" DROP CONSTRAINT "Granja_Distribuidor_id_granja_fkey";

-- AlterTable
ALTER TABLE "Granja" DROP COLUMN "id_raza";

-- AlterTable
ALTER TABLE "Granja_Distribuidor" DROP COLUMN "id_granja",
ADD COLUMN     "granjaId_granja" INTEGER,
ADD COLUMN     "granjaRazasId" INTEGER;

-- CreateTable
CREATE TABLE "GranjaRazas" (
    "id" SERIAL NOT NULL,
    "id_granja" INTEGER NOT NULL,
    "id_raza" INTEGER NOT NULL,

    CONSTRAINT "GranjaRazas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Granja_Distribuidor" ADD CONSTRAINT "Granja_Distribuidor_granjaRazasId_fkey" FOREIGN KEY ("granjaRazasId") REFERENCES "GranjaRazas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Granja_Distribuidor" ADD CONSTRAINT "Granja_Distribuidor_granjaId_granja_fkey" FOREIGN KEY ("granjaId_granja") REFERENCES "Granja"("id_granja") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GranjaRazas" ADD CONSTRAINT "GranjaRazas_id_granja_fkey" FOREIGN KEY ("id_granja") REFERENCES "Granja"("id_granja") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GranjaRazas" ADD CONSTRAINT "GranjaRazas_id_raza_fkey" FOREIGN KEY ("id_raza") REFERENCES "Razas"("id_raza") ON DELETE RESTRICT ON UPDATE CASCADE;
