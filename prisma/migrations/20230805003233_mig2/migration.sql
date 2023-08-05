/*
  Warnings:

  - You are about to drop the column `id_granja_raza` on the `Granja` table. All the data in the column will be lost.
  - You are about to drop the `Granja_Raza` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_raza` to the `Granja` table without a default value. This is not possible if the table is not empty.
  - Made the column `id_animal` on table `Razas` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Granja" DROP CONSTRAINT "Granja_id_granja_raza_fkey";

-- DropForeignKey
ALTER TABLE "Granja_Raza" DROP CONSTRAINT "Granja_Raza_id_raza_fkey";

-- DropForeignKey
ALTER TABLE "Razas" DROP CONSTRAINT "Razas_id_animal_fkey";

-- AlterTable
ALTER TABLE "Granja" DROP COLUMN "id_granja_raza",
ADD COLUMN     "id_raza" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Razas" ALTER COLUMN "id_animal" SET NOT NULL;

-- DropTable
DROP TABLE "Granja_Raza";

-- AddForeignKey
ALTER TABLE "Granja" ADD CONSTRAINT "Granja_id_raza_fkey" FOREIGN KEY ("id_raza") REFERENCES "Razas"("id_raza") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Razas" ADD CONSTRAINT "Razas_id_animal_fkey" FOREIGN KEY ("id_animal") REFERENCES "Animal"("id_animal") ON DELETE RESTRICT ON UPDATE CASCADE;
