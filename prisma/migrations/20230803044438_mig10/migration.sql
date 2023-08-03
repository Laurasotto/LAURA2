/*
  Warnings:

  - You are about to drop the column `id_tipo_corte` on the `Corte` table. All the data in the column will be lost.
  - You are about to drop the column `id_categoria` on the `Granja` table. All the data in the column will be lost.
  - You are about to drop the column `id_distribuidor` on the `Granja_Distribuidor` table. All the data in the column will be lost.
  - You are about to drop the column `id_granja` on the `Granja_Distribuidor` table. All the data in the column will be lost.
  - You are about to drop the column `id_granja_distri` on the `Movimiento_Entrada` table. All the data in the column will be lost.
  - You are about to drop the column `id_negocio` on the `Movimiento_Entrada` table. All the data in the column will be lost.
  - You are about to drop the column `id_tipo_corte` on the `Movimiento_Entrada` table. All the data in the column will be lost.
  - You are about to drop the column `cantidad_salida` on the `Movimiento_Salida` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Categoria_Animal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tipo_Corte` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_distribuidor1` to the `Granja_Distribuidor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_granja1` to the `Granja_Distribuidor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_granja_distri1` to the `Movimiento_Entrada` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_negocio1` to the `Movimiento_Entrada` table without a default value. This is not possible if the table is not empty.
  - Added the required column `peso` to the `Movimiento_Entrada` table without a default value. This is not possible if the table is not empty.
  - Added the required column `peso` to the `Movimiento_Salida` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precio_salida` to the `Movimiento_Salida` table without a default value. This is not possible if the table is not empty.
  - Added the required column `apellido` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `documento` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefono` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Corte" DROP CONSTRAINT "Corte_id_categoria_fkey";

-- DropForeignKey
ALTER TABLE "Corte" DROP CONSTRAINT "Corte_id_raza_fkey";

-- DropForeignKey
ALTER TABLE "Corte" DROP CONSTRAINT "Corte_id_tipo_corte_fkey";

-- DropForeignKey
ALTER TABLE "Granja" DROP CONSTRAINT "Granja_id_categoria_fkey";

-- DropForeignKey
ALTER TABLE "Granja_Distribuidor" DROP CONSTRAINT "Granja_Distribuidor_id_distribuidor_fkey";

-- DropForeignKey
ALTER TABLE "Granja_Distribuidor" DROP CONSTRAINT "Granja_Distribuidor_id_granja_fkey";

-- DropForeignKey
ALTER TABLE "Movimiento_Entrada" DROP CONSTRAINT "Movimiento_Entrada_id_corte_fkey";

-- DropForeignKey
ALTER TABLE "Movimiento_Entrada" DROP CONSTRAINT "Movimiento_Entrada_id_granja_distri_fkey";

-- DropForeignKey
ALTER TABLE "Movimiento_Entrada" DROP CONSTRAINT "Movimiento_Entrada_id_negocio_fkey";

-- DropForeignKey
ALTER TABLE "Movimiento_Entrada" DROP CONSTRAINT "Movimiento_Entrada_id_tipo_corte_fkey";

-- DropForeignKey
ALTER TABLE "Movimiento_Salida" DROP CONSTRAINT "Movimiento_Salida_id_corte_fkey";

-- DropForeignKey
ALTER TABLE "Razas" DROP CONSTRAINT "Razas_id_categoria_fkey";

-- DropForeignKey
ALTER TABLE "Tipo_Corte" DROP CONSTRAINT "Tipo_Corte_id_categoria_fkey";

-- DropForeignKey
ALTER TABLE "Tipo_Corte" DROP CONSTRAINT "Tipo_Corte_id_raza_fkey";

-- AlterTable
ALTER TABLE "Corte" DROP COLUMN "id_tipo_corte";

-- AlterTable
ALTER TABLE "Granja" DROP COLUMN "id_categoria";

-- AlterTable
ALTER TABLE "Granja_Distribuidor" DROP COLUMN "id_distribuidor",
DROP COLUMN "id_granja",
ADD COLUMN     "id_distribuidor1" INTEGER NOT NULL,
ADD COLUMN     "id_granja1" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Movimiento_Entrada" DROP COLUMN "id_granja_distri",
DROP COLUMN "id_negocio",
DROP COLUMN "id_tipo_corte",
ADD COLUMN     "id_granja_distri1" INTEGER NOT NULL,
ADD COLUMN     "id_negocio1" INTEGER NOT NULL,
ADD COLUMN     "peso" INTEGER NOT NULL,
ALTER COLUMN "id_corte" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Movimiento_Salida" DROP COLUMN "cantidad_salida",
ADD COLUMN     "peso" INTEGER NOT NULL,
ADD COLUMN     "precio_salida" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "username",
ADD COLUMN     "apellido" TEXT NOT NULL,
ADD COLUMN     "documento" INTEGER NOT NULL,
ADD COLUMN     "nombre" TEXT NOT NULL,
ADD COLUMN     "telefono" TEXT NOT NULL;

-- DropTable
DROP TABLE "Categoria_Animal";

-- DropTable
DROP TABLE "Tipo_Corte";

-- CreateTable
CREATE TABLE "Animal" (
    "id_categoria" SERIAL NOT NULL,
    "nombre_categoria" TEXT NOT NULL,

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id_categoria")
);

-- CreateTable
CREATE TABLE "_AnimalToGranja" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AnimalToGranja_AB_unique" ON "_AnimalToGranja"("A", "B");

-- CreateIndex
CREATE INDEX "_AnimalToGranja_B_index" ON "_AnimalToGranja"("B");

-- AddForeignKey
ALTER TABLE "Granja_Distribuidor" ADD CONSTRAINT "Granja_Distribuidor_id_distribuidor1_fkey" FOREIGN KEY ("id_distribuidor1") REFERENCES "Distribuidor"("id_distribuidor") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Granja_Distribuidor" ADD CONSTRAINT "Granja_Distribuidor_id_granja1_fkey" FOREIGN KEY ("id_granja1") REFERENCES "Granja"("id_granja") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimiento_Entrada" ADD CONSTRAINT "Movimiento_Entrada_id_negocio1_fkey" FOREIGN KEY ("id_negocio1") REFERENCES "Negocio"("id_negocio") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimiento_Entrada" ADD CONSTRAINT "Movimiento_Entrada_id_granja_distri1_fkey" FOREIGN KEY ("id_granja_distri1") REFERENCES "Granja_Distribuidor"("id_granja_distri") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimiento_Entrada" ADD CONSTRAINT "Movimiento_Entrada_id_corte_fkey" FOREIGN KEY ("id_corte") REFERENCES "Corte"("id_corte") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Corte" ADD CONSTRAINT "Corte_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "Animal"("id_categoria") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Razas" ADD CONSTRAINT "Razas_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "Animal"("id_categoria") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimalToGranja" ADD CONSTRAINT "_AnimalToGranja_A_fkey" FOREIGN KEY ("A") REFERENCES "Animal"("id_categoria") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimalToGranja" ADD CONSTRAINT "_AnimalToGranja_B_fkey" FOREIGN KEY ("B") REFERENCES "Granja"("id_granja") ON DELETE CASCADE ON UPDATE CASCADE;
