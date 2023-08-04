/*
  Warnings:

  - A unique constraint covering the columns `[nombre]` on the table `Corte` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nombre_raza]` on the table `Razas` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nombre` to the `Corte` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Corte" ADD COLUMN     "nombre" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Corte_nombre_key" ON "Corte"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Razas_nombre_raza_key" ON "Razas"("nombre_raza");
