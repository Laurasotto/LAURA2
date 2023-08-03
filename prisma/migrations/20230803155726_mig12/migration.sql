/*
  Warnings:

  - The primary key for the `Animal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_categoria` on the `Animal` table. All the data in the column will be lost.
  - You are about to drop the column `nombre_categoria` on the `Animal` table. All the data in the column will be lost.
  - You are about to drop the column `id_categoria` on the `Corte` table. All the data in the column will be lost.
  - You are about to drop the column `id_raza` on the `Corte` table. All the data in the column will be lost.
  - The primary key for the `Granja_Distribuidor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `fecha_entrada` on the `Granja_Distribuidor` table. All the data in the column will be lost.
  - The primary key for the `Movimiento_Entrada` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `fecha_creacion` on the `Movimiento_Entrada` table. All the data in the column will be lost.
  - You are about to drop the column `id_corte` on the `Movimiento_Entrada` table. All the data in the column will be lost.
  - You are about to drop the column `id_distribuidor` on the `Movimiento_Entrada` table. All the data in the column will be lost.
  - You are about to drop the column `id_granja` on the `Movimiento_Entrada` table. All the data in the column will be lost.
  - You are about to drop the column `id_mov_entra` on the `Movimiento_Entrada` table. All the data in the column will be lost.
  - You are about to drop the column `id_negocio1` on the `Movimiento_Entrada` table. All the data in the column will be lost.
  - You are about to drop the column `precio_entrada` on the `Movimiento_Entrada` table. All the data in the column will be lost.
  - You are about to drop the `Movimiento_Salida` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AnimalToGranja` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `nombre_animal` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_animal` to the `Granja` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_gd` to the `Movimiento_Entrada` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precio` to the `Movimiento_Entrada` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Corte" DROP CONSTRAINT "Corte_id_categoria_fkey";

-- DropForeignKey
ALTER TABLE "Movimiento_Entrada" DROP CONSTRAINT "Movimiento_Entrada_id_corte_fkey";

-- DropForeignKey
ALTER TABLE "Movimiento_Entrada" DROP CONSTRAINT "Movimiento_Entrada_id_distribuidor_id_granja_fkey";

-- DropForeignKey
ALTER TABLE "Movimiento_Entrada" DROP CONSTRAINT "Movimiento_Entrada_id_negocio1_fkey";

-- DropForeignKey
ALTER TABLE "Movimiento_Salida" DROP CONSTRAINT "Movimiento_Salida_id_distribuidor_fkey";

-- DropForeignKey
ALTER TABLE "Movimiento_Salida" DROP CONSTRAINT "Movimiento_Salida_id_negocio_fkey";

-- DropForeignKey
ALTER TABLE "Movimiento_Salida" DROP CONSTRAINT "Movimiento_Salida_id_raza_fkey";

-- DropForeignKey
ALTER TABLE "Razas" DROP CONSTRAINT "Razas_id_categoria_fkey";

-- DropForeignKey
ALTER TABLE "_AnimalToGranja" DROP CONSTRAINT "_AnimalToGranja_A_fkey";

-- DropForeignKey
ALTER TABLE "_AnimalToGranja" DROP CONSTRAINT "_AnimalToGranja_B_fkey";

-- AlterTable
ALTER TABLE "Animal" DROP CONSTRAINT "Animal_pkey",
DROP COLUMN "id_categoria",
DROP COLUMN "nombre_categoria",
ADD COLUMN     "id_animal" SERIAL NOT NULL,
ADD COLUMN     "id_raza" INTEGER,
ADD COLUMN     "nombre_animal" TEXT NOT NULL,
ADD CONSTRAINT "Animal_pkey" PRIMARY KEY ("id_animal");

-- AlterTable
ALTER TABLE "Corte" DROP COLUMN "id_categoria",
DROP COLUMN "id_raza";

-- AlterTable
ALTER TABLE "Granja" ADD COLUMN     "id_animal" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Granja_Distribuidor" DROP CONSTRAINT "Granja_Distribuidor_pkey",
DROP COLUMN "fecha_entrada",
ADD COLUMN     "id_gd" SERIAL NOT NULL,
ADD CONSTRAINT "Granja_Distribuidor_pkey" PRIMARY KEY ("id_gd");

-- AlterTable
ALTER TABLE "Movimiento_Entrada" DROP CONSTRAINT "Movimiento_Entrada_pkey",
DROP COLUMN "fecha_creacion",
DROP COLUMN "id_corte",
DROP COLUMN "id_distribuidor",
DROP COLUMN "id_granja",
DROP COLUMN "id_mov_entra",
DROP COLUMN "id_negocio1",
DROP COLUMN "precio_entrada",
ADD COLUMN     "corteId" INTEGER,
ADD COLUMN     "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "id_gd" INTEGER NOT NULL,
ADD COLUMN     "precio" INTEGER NOT NULL,
ADD CONSTRAINT "Movimiento_Entrada_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Movimiento_Salida";

-- DropTable
DROP TABLE "_AnimalToGranja";

-- CreateTable
CREATE TABLE "Movimiento_salida" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "peso" INTEGER NOT NULL,
    "precio" INTEGER NOT NULL,
    "movimientoEntradaId" INTEGER,

    CONSTRAINT "Movimiento_salida_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Movimiento_Entrada" ADD CONSTRAINT "Movimiento_Entrada_id_gd_fkey" FOREIGN KEY ("id_gd") REFERENCES "Granja_Distribuidor"("id_gd") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimiento_Entrada" ADD CONSTRAINT "Movimiento_Entrada_corteId_fkey" FOREIGN KEY ("corteId") REFERENCES "Corte"("id_corte") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimiento_salida" ADD CONSTRAINT "Movimiento_salida_movimientoEntradaId_fkey" FOREIGN KEY ("movimientoEntradaId") REFERENCES "Movimiento_Entrada"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Granja" ADD CONSTRAINT "Granja_id_animal_fkey" FOREIGN KEY ("id_animal") REFERENCES "Animal"("id_animal") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_id_raza_fkey" FOREIGN KEY ("id_raza") REFERENCES "Razas"("id_raza") ON DELETE SET NULL ON UPDATE CASCADE;
