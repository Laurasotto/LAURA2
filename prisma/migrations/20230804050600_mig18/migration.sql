-- CreateTable
CREATE TABLE "Granja_Raza" (
    "id_granja_raza" SERIAL NOT NULL,
    "id_granja" INTEGER NOT NULL,
    "id_raza" INTEGER NOT NULL,

    CONSTRAINT "Granja_Raza_pkey" PRIMARY KEY ("id_granja_raza")
);

-- AddForeignKey
ALTER TABLE "Granja_Raza" ADD CONSTRAINT "Granja_Raza_id_granja_fkey" FOREIGN KEY ("id_granja") REFERENCES "Granja"("id_granja") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Granja_Raza" ADD CONSTRAINT "Granja_Raza_id_raza_fkey" FOREIGN KEY ("id_raza") REFERENCES "Razas"("id_raza") ON DELETE RESTRICT ON UPDATE CASCADE;
