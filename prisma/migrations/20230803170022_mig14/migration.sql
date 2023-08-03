/*
  Warnings:

  - You are about to drop the column `nombre_categoria` on the `Animal` table. All the data in the column will be lost.
  - You are about to drop the column `id_categoria` on the `Razas` table. All the data in the column will be lost.
  - Added the required column `nombre_animal` to the `Animal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Animal" DROP COLUMN "nombre_categoria",
ADD COLUMN     "nombre_animal" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Razas" DROP COLUMN "id_categoria";
