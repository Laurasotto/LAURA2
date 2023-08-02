/*
  Warnings:

  - The primary key for the `Categoria_Animal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id_categoria` column on the `Categoria_Animal` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Corte` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id_corte` column on the `Corte` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Distribuidor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id_distribuidor` column on the `Distribuidor` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Granja` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id_granja` column on the `Granja` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Granja_Distribuidor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id_granja_distri` column on the `Granja_Distribuidor` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Movimiento_Entrada` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id_mov_entra` column on the `Movimiento_Entrada` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Movimiento_Salida` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id_salida` column on the `Movimiento_Salida` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Negocio` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id_negocio` column on the `Negocio` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Razas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id_raza` column on the `Razas` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Tipo_Corte` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id_tipo_corte` column on the `Tipo_Corte` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `id_tipo_corte` on the `Corte` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_raza` on the `Corte` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_categoria` on the `Corte` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_categoria` on the `Granja` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_distribuidor` on the `Granja_Distribuidor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_granja` on the `Granja_Distribuidor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_negocio` on the `Movimiento_Entrada` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_granja_distri` on the `Movimiento_Entrada` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_corte` on the `Movimiento_Entrada` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_tipo_corte` on the `Movimiento_Entrada` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_negocio` on the `Movimiento_Salida` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_distribuidor` on the `Movimiento_Salida` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_corte` on the `Movimiento_Salida` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_raza` on the `Movimiento_Salida` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `userId` to the `Negocio` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id_distribuidor` on the `Negocio` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_categoria` on the `Razas` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_raza` on the `Tipo_Corte` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_categoria` on the `Tipo_Corte` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

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
ALTER TABLE "Movimiento_Salida" DROP CONSTRAINT "Movimiento_Salida_id_distribuidor_fkey";

-- DropForeignKey
ALTER TABLE "Movimiento_Salida" DROP CONSTRAINT "Movimiento_Salida_id_negocio_fkey";

-- DropForeignKey
ALTER TABLE "Movimiento_Salida" DROP CONSTRAINT "Movimiento_Salida_id_raza_fkey";

-- DropForeignKey
ALTER TABLE "Negocio" DROP CONSTRAINT "Negocio_id_distribuidor_fkey";

-- DropForeignKey
ALTER TABLE "Razas" DROP CONSTRAINT "Razas_id_categoria_fkey";

-- DropForeignKey
ALTER TABLE "Tipo_Corte" DROP CONSTRAINT "Tipo_Corte_id_categoria_fkey";

-- DropForeignKey
ALTER TABLE "Tipo_Corte" DROP CONSTRAINT "Tipo_Corte_id_raza_fkey";

-- AlterTable
ALTER TABLE "Categoria_Animal" DROP CONSTRAINT "Categoria_Animal_pkey",
DROP COLUMN "id_categoria",
ADD COLUMN     "id_categoria" SERIAL NOT NULL,
ADD CONSTRAINT "Categoria_Animal_pkey" PRIMARY KEY ("id_categoria");

-- AlterTable
ALTER TABLE "Corte" DROP CONSTRAINT "Corte_pkey",
DROP COLUMN "id_corte",
ADD COLUMN     "id_corte" SERIAL NOT NULL,
DROP COLUMN "id_tipo_corte",
ADD COLUMN     "id_tipo_corte" INTEGER NOT NULL,
DROP COLUMN "id_raza",
ADD COLUMN     "id_raza" INTEGER NOT NULL,
DROP COLUMN "id_categoria",
ADD COLUMN     "id_categoria" INTEGER NOT NULL,
ALTER COLUMN "fecha_creacion" SET DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "Corte_pkey" PRIMARY KEY ("id_corte");

-- AlterTable
ALTER TABLE "Distribuidor" DROP CONSTRAINT "Distribuidor_pkey",
DROP COLUMN "id_distribuidor",
ADD COLUMN     "id_distribuidor" SERIAL NOT NULL,
ALTER COLUMN "fecha_creacion" SET DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "Distribuidor_pkey" PRIMARY KEY ("id_distribuidor");

-- AlterTable
ALTER TABLE "Granja" DROP CONSTRAINT "Granja_pkey",
DROP COLUMN "id_granja",
ADD COLUMN     "id_granja" SERIAL NOT NULL,
DROP COLUMN "id_categoria",
ADD COLUMN     "id_categoria" INTEGER NOT NULL,
ALTER COLUMN "fecha_creacion" SET DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "Granja_pkey" PRIMARY KEY ("id_granja");

-- AlterTable
ALTER TABLE "Granja_Distribuidor" DROP CONSTRAINT "Granja_Distribuidor_pkey",
DROP COLUMN "id_granja_distri",
ADD COLUMN     "id_granja_distri" SERIAL NOT NULL,
ALTER COLUMN "fecha_entrada" SET DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "id_distribuidor",
ADD COLUMN     "id_distribuidor" INTEGER NOT NULL,
DROP COLUMN "id_granja",
ADD COLUMN     "id_granja" INTEGER NOT NULL,
ADD CONSTRAINT "Granja_Distribuidor_pkey" PRIMARY KEY ("id_granja_distri");

-- AlterTable
ALTER TABLE "Movimiento_Entrada" DROP CONSTRAINT "Movimiento_Entrada_pkey",
DROP COLUMN "id_mov_entra",
ADD COLUMN     "id_mov_entra" SERIAL NOT NULL,
DROP COLUMN "id_negocio",
ADD COLUMN     "id_negocio" INTEGER NOT NULL,
DROP COLUMN "id_granja_distri",
ADD COLUMN     "id_granja_distri" INTEGER NOT NULL,
DROP COLUMN "id_corte",
ADD COLUMN     "id_corte" INTEGER NOT NULL,
DROP COLUMN "id_tipo_corte",
ADD COLUMN     "id_tipo_corte" INTEGER NOT NULL,
ADD CONSTRAINT "Movimiento_Entrada_pkey" PRIMARY KEY ("id_mov_entra");

-- AlterTable
ALTER TABLE "Movimiento_Salida" DROP CONSTRAINT "Movimiento_Salida_pkey",
DROP COLUMN "id_salida",
ADD COLUMN     "id_salida" SERIAL NOT NULL,
DROP COLUMN "id_negocio",
ADD COLUMN     "id_negocio" INTEGER NOT NULL,
DROP COLUMN "id_distribuidor",
ADD COLUMN     "id_distribuidor" INTEGER NOT NULL,
DROP COLUMN "id_corte",
ADD COLUMN     "id_corte" INTEGER NOT NULL,
ALTER COLUMN "fecha_salida" SET DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "id_raza",
ADD COLUMN     "id_raza" INTEGER NOT NULL,
ADD CONSTRAINT "Movimiento_Salida_pkey" PRIMARY KEY ("id_salida");

-- AlterTable
ALTER TABLE "Negocio" DROP CONSTRAINT "Negocio_pkey",
ADD COLUMN     "userId" INTEGER NOT NULL,
DROP COLUMN "id_negocio",
ADD COLUMN     "id_negocio" SERIAL NOT NULL,
DROP COLUMN "id_distribuidor",
ADD COLUMN     "id_distribuidor" INTEGER NOT NULL,
ALTER COLUMN "fecha_creacion" SET DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "Negocio_pkey" PRIMARY KEY ("id_negocio");

-- AlterTable
ALTER TABLE "Razas" DROP CONSTRAINT "Razas_pkey",
DROP COLUMN "id_raza",
ADD COLUMN     "id_raza" SERIAL NOT NULL,
DROP COLUMN "id_categoria",
ADD COLUMN     "id_categoria" INTEGER NOT NULL,
ADD CONSTRAINT "Razas_pkey" PRIMARY KEY ("id_raza");

-- AlterTable
ALTER TABLE "Tipo_Corte" DROP CONSTRAINT "Tipo_Corte_pkey",
DROP COLUMN "id_tipo_corte",
ADD COLUMN     "id_tipo_corte" SERIAL NOT NULL,
DROP COLUMN "id_raza",
ADD COLUMN     "id_raza" INTEGER NOT NULL,
DROP COLUMN "id_categoria",
ADD COLUMN     "id_categoria" INTEGER NOT NULL,
ALTER COLUMN "fecha_creacion" SET DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "Tipo_Corte_pkey" PRIMARY KEY ("id_tipo_corte");

-- AddForeignKey
ALTER TABLE "Negocio" ADD CONSTRAINT "Negocio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Negocio" ADD CONSTRAINT "Negocio_id_distribuidor_fkey" FOREIGN KEY ("id_distribuidor") REFERENCES "Distribuidor"("id_distribuidor") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimiento_Entrada" ADD CONSTRAINT "Movimiento_Entrada_id_negocio_fkey" FOREIGN KEY ("id_negocio") REFERENCES "Negocio"("id_negocio") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimiento_Entrada" ADD CONSTRAINT "Movimiento_Entrada_id_granja_distri_fkey" FOREIGN KEY ("id_granja_distri") REFERENCES "Granja_Distribuidor"("id_granja_distri") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimiento_Entrada" ADD CONSTRAINT "Movimiento_Entrada_id_corte_fkey" FOREIGN KEY ("id_corte") REFERENCES "Corte"("id_corte") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimiento_Entrada" ADD CONSTRAINT "Movimiento_Entrada_id_tipo_corte_fkey" FOREIGN KEY ("id_tipo_corte") REFERENCES "Tipo_Corte"("id_tipo_corte") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimiento_Salida" ADD CONSTRAINT "Movimiento_Salida_id_negocio_fkey" FOREIGN KEY ("id_negocio") REFERENCES "Negocio"("id_negocio") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimiento_Salida" ADD CONSTRAINT "Movimiento_Salida_id_distribuidor_fkey" FOREIGN KEY ("id_distribuidor") REFERENCES "Distribuidor"("id_distribuidor") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimiento_Salida" ADD CONSTRAINT "Movimiento_Salida_id_corte_fkey" FOREIGN KEY ("id_corte") REFERENCES "Corte"("id_corte") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimiento_Salida" ADD CONSTRAINT "Movimiento_Salida_id_raza_fkey" FOREIGN KEY ("id_raza") REFERENCES "Razas"("id_raza") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Granja_Distribuidor" ADD CONSTRAINT "Granja_Distribuidor_id_distribuidor_fkey" FOREIGN KEY ("id_distribuidor") REFERENCES "Distribuidor"("id_distribuidor") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Granja_Distribuidor" ADD CONSTRAINT "Granja_Distribuidor_id_granja_fkey" FOREIGN KEY ("id_granja") REFERENCES "Granja"("id_granja") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Corte" ADD CONSTRAINT "Corte_id_tipo_corte_fkey" FOREIGN KEY ("id_tipo_corte") REFERENCES "Tipo_Corte"("id_tipo_corte") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Corte" ADD CONSTRAINT "Corte_id_raza_fkey" FOREIGN KEY ("id_raza") REFERENCES "Razas"("id_raza") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Corte" ADD CONSTRAINT "Corte_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "Categoria_Animal"("id_categoria") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Razas" ADD CONSTRAINT "Razas_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "Categoria_Animal"("id_categoria") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tipo_Corte" ADD CONSTRAINT "Tipo_Corte_id_raza_fkey" FOREIGN KEY ("id_raza") REFERENCES "Razas"("id_raza") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tipo_Corte" ADD CONSTRAINT "Tipo_Corte_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "Categoria_Animal"("id_categoria") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Granja" ADD CONSTRAINT "Granja_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "Categoria_Animal"("id_categoria") ON DELETE RESTRICT ON UPDATE CASCADE;
