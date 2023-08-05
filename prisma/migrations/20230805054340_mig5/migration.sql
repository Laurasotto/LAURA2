/*
  Warnings:

  - You are about to drop the column `id_gd` on the `Movimiento_Entrada` table. All the data in the column will be lost.
  - You are about to drop the `Granja_Distribuidor` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `distribuidorId` to the `Movimiento_Entrada` table without a default value. This is not possible if the table is not empty.
  - Added the required column `granjaId` to the `Movimiento_Entrada` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Granja_Distribuidor" DROP CONSTRAINT "Granja_Distribuidor_granjaId_granja_fkey";

-- DropForeignKey
ALTER TABLE "Granja_Distribuidor" DROP CONSTRAINT "Granja_Distribuidor_granjaRazasId_fkey";

-- DropForeignKey
ALTER TABLE "Granja_Distribuidor" DROP CONSTRAINT "Granja_Distribuidor_id_distribuidor_fkey";

-- DropForeignKey
ALTER TABLE "Movimiento_Entrada" DROP CONSTRAINT "Movimiento_Entrada_id_gd_fkey";

-- AlterTable
ALTER TABLE "Movimiento_Entrada" DROP COLUMN "id_gd",
ADD COLUMN     "distribuidorId" INTEGER NOT NULL,
ADD COLUMN     "granjaId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Granja_Distribuidor";

-- AddForeignKey
ALTER TABLE "Movimiento_Entrada" ADD CONSTRAINT "Movimiento_Entrada_granjaId_fkey" FOREIGN KEY ("granjaId") REFERENCES "GranjaRazas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimiento_Entrada" ADD CONSTRAINT "Movimiento_Entrada_distribuidorId_fkey" FOREIGN KEY ("distribuidorId") REFERENCES "Distribuidor"("id_distribuidor") ON DELETE RESTRICT ON UPDATE CASCADE;
