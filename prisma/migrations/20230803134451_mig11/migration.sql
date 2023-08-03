/*
  Warnings:

  - The primary key for the `Granja_Distribuidor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_distribuidor1` on the `Granja_Distribuidor` table. All the data in the column will be lost.
  - You are about to drop the column `id_granja1` on the `Granja_Distribuidor` table. All the data in the column will be lost.
  - You are about to drop the column `id_granja_distri` on the `Granja_Distribuidor` table. All the data in the column will be lost.
  - You are about to drop the column `id_granja_distri1` on the `Movimiento_Entrada` table. All the data in the column will be lost.
  - Added the required column `id_distribuidor` to the `Granja_Distribuidor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_granja` to the `Granja_Distribuidor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_distribuidor` to the `Movimiento_Entrada` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_granja` to the `Movimiento_Entrada` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Granja_Distribuidor" DROP CONSTRAINT "Granja_Distribuidor_id_distribuidor1_fkey";

-- DropForeignKey
ALTER TABLE "Granja_Distribuidor" DROP CONSTRAINT "Granja_Distribuidor_id_granja1_fkey";

-- DropForeignKey
ALTER TABLE "Movimiento_Entrada" DROP CONSTRAINT "Movimiento_Entrada_id_granja_distri1_fkey";

-- AlterTable
ALTER TABLE "Granja_Distribuidor" DROP CONSTRAINT "Granja_Distribuidor_pkey",
DROP COLUMN "id_distribuidor1",
DROP COLUMN "id_granja1",
DROP COLUMN "id_granja_distri",
ADD COLUMN     "id_distribuidor" INTEGER NOT NULL,
ADD COLUMN     "id_granja" INTEGER NOT NULL,
ADD CONSTRAINT "Granja_Distribuidor_pkey" PRIMARY KEY ("id_distribuidor", "id_granja");

-- AlterTable
ALTER TABLE "Movimiento_Entrada" DROP COLUMN "id_granja_distri1",
ADD COLUMN     "id_distribuidor" INTEGER NOT NULL,
ADD COLUMN     "id_granja" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Granja_Distribuidor" ADD CONSTRAINT "Granja_Distribuidor_id_distribuidor_fkey" FOREIGN KEY ("id_distribuidor") REFERENCES "Distribuidor"("id_distribuidor") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Granja_Distribuidor" ADD CONSTRAINT "Granja_Distribuidor_id_granja_fkey" FOREIGN KEY ("id_granja") REFERENCES "Granja"("id_granja") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimiento_Entrada" ADD CONSTRAINT "Movimiento_Entrada_id_distribuidor_id_granja_fkey" FOREIGN KEY ("id_distribuidor", "id_granja") REFERENCES "Granja_Distribuidor"("id_distribuidor", "id_granja") ON DELETE RESTRICT ON UPDATE CASCADE;
