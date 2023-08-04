/*
  Warnings:

  - The `id_raza` column on the `Granja` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Granja" DROP CONSTRAINT "Granja_id_raza_fkey";

-- AlterTable
ALTER TABLE "Granja" DROP COLUMN "id_raza",
ADD COLUMN     "id_raza" INTEGER[];

-- AddForeignKey
ALTER TABLE "Granja" ADD CONSTRAINT "Granja_id_raza_fkey" FOREIGN KEY ("id_raza") REFERENCES "Razas"("id_raza") ON DELETE CASCADE ON UPDATE CASCADE;
