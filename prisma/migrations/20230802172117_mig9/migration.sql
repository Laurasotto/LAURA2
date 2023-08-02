/*
  Warnings:

  - You are about to drop the column `id_distribuidor` on the `Negocio` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Negocio" DROP CONSTRAINT "Negocio_id_distribuidor_fkey";

-- AlterTable
ALTER TABLE "Negocio" DROP COLUMN "id_distribuidor";

-- CreateTable
CREATE TABLE "_DistribuidoresNegocios" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DistribuidoresNegocios_AB_unique" ON "_DistribuidoresNegocios"("A", "B");

-- CreateIndex
CREATE INDEX "_DistribuidoresNegocios_B_index" ON "_DistribuidoresNegocios"("B");

-- AddForeignKey
ALTER TABLE "_DistribuidoresNegocios" ADD CONSTRAINT "_DistribuidoresNegocios_A_fkey" FOREIGN KEY ("A") REFERENCES "Distribuidor"("id_distribuidor") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DistribuidoresNegocios" ADD CONSTRAINT "_DistribuidoresNegocios_B_fkey" FOREIGN KEY ("B") REFERENCES "Negocio"("id_negocio") ON DELETE CASCADE ON UPDATE CASCADE;
