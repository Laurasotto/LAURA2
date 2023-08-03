/*
  Warnings:

  - You are about to drop the column `id_raza` on the `Animal` table. All the data in the column will be lost.
  - You are about to drop the column `nombre_animal` on the `Animal` table. All the data in the column will be lost.
  - You are about to drop the column `id_animal` on the `Granja` table. All the data in the column will be lost.
  - Added the required column `nombre_categoria` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_raza` to the `Granja` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_categoria` to the `Razas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Animal" DROP CONSTRAINT "Animal_id_raza_fkey";

-- DropForeignKey
ALTER TABLE "Granja" DROP CONSTRAINT "Granja_id_animal_fkey";

-- AlterTable
ALTER TABLE "Animal" DROP COLUMN "id_raza",
DROP COLUMN "nombre_animal",
ADD COLUMN     "nombre_categoria" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Granja" DROP COLUMN "id_animal",
ADD COLUMN     "id_raza" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Razas" ADD COLUMN     "id_animal" INTEGER,
ADD COLUMN     "id_categoria" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Granja" ADD CONSTRAINT "Granja_id_raza_fkey" FOREIGN KEY ("id_raza") REFERENCES "Razas"("id_raza") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Razas" ADD CONSTRAINT "Razas_id_animal_fkey" FOREIGN KEY ("id_animal") REFERENCES "Animal"("id_animal") ON DELETE SET NULL ON UPDATE CASCADE;
