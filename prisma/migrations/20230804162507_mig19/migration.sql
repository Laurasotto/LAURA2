/*
  Warnings:

  - You are about to drop the column `id_raza` on the `Granja` table. All the data in the column will be lost.
  - The `nombre_raza` column on the `Razas` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[nombre_animal]` on the table `Animal` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nombre_corte]` on the table `Corte` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[direccion]` on the table `Granja` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nombre_raza]` on the table `Razas` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nombre_corte` to the `Corte` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_granja_raza` to the `Granja` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Granja" DROP CONSTRAINT "Granja_id_raza_fkey";

-- DropForeignKey
ALTER TABLE "Granja_Raza" DROP CONSTRAINT "Granja_Raza_id_granja_fkey";

-- AlterTable
ALTER TABLE "Corte" ADD COLUMN     "nombre_corte" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Granja" DROP COLUMN "id_raza",
ADD COLUMN     "id_granja_raza" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Razas" DROP COLUMN "nombre_raza",
ADD COLUMN     "nombre_raza" TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "Animal_nombre_animal_key" ON "Animal"("nombre_animal");

-- CreateIndex
CREATE UNIQUE INDEX "Corte_nombre_corte_key" ON "Corte"("nombre_corte");

-- CreateIndex
CREATE UNIQUE INDEX "Granja_direccion_key" ON "Granja"("direccion");

-- CreateIndex
CREATE UNIQUE INDEX "Razas_nombre_raza_key" ON "Razas"("nombre_raza");

-- AddForeignKey
ALTER TABLE "Granja" ADD CONSTRAINT "Granja_id_granja_raza_fkey" FOREIGN KEY ("id_granja_raza") REFERENCES "Granja_Raza"("id_granja_raza") ON DELETE CASCADE ON UPDATE CASCADE;
