-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "documento" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "roleId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Negocio" (
    "id_negocio" SERIAL NOT NULL,
    "nombre_negocio" TEXT NOT NULL,
    "direccion_negocio" TEXT NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Negocio_pkey" PRIMARY KEY ("id_negocio")
);

-- CreateTable
CREATE TABLE "Distribuidor" (
    "id_distribuidor" SERIAL NOT NULL,
    "nombre_distribuidor" TEXT NOT NULL,
    "apellido_distribuidor" TEXT NOT NULL,
    "telefono_distribuidor" TEXT NOT NULL,
    "documento_distribuidor" INTEGER NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Distribuidor_pkey" PRIMARY KEY ("id_distribuidor")
);

-- CreateTable
CREATE TABLE "Negocio_Distribuidor" (
    "id_nd" SERIAL NOT NULL,
    "id_distribuidor" INTEGER NOT NULL,
    "id_negocio" INTEGER NOT NULL,

    CONSTRAINT "Negocio_Distribuidor_pkey" PRIMARY KEY ("id_nd")
);

-- CreateTable
CREATE TABLE "Granja_Distribuidor" (
    "id_gd" SERIAL NOT NULL,
    "id_distribuidor" INTEGER NOT NULL,
    "id_granja" INTEGER NOT NULL,

    CONSTRAINT "Granja_Distribuidor_pkey" PRIMARY KEY ("id_gd")
);

-- CreateTable
CREATE TABLE "Movimiento_Entrada" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "peso" INTEGER NOT NULL,
    "precio" INTEGER NOT NULL,
    "id_gd" INTEGER NOT NULL,
    "corteId" INTEGER,

    CONSTRAINT "Movimiento_Entrada_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movimiento_salida" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "peso" INTEGER NOT NULL,
    "precio" INTEGER NOT NULL,
    "movimientoEntradaId" INTEGER,

    CONSTRAINT "Movimiento_salida_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Corte" (
    "id_corte" SERIAL NOT NULL,
    "nombre_corte" TEXT NOT NULL,
    "presentacion" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Corte_pkey" PRIMARY KEY ("id_corte")
);

-- CreateTable
CREATE TABLE "Granja" (
    "id_granja" SERIAL NOT NULL,
    "nombre_granja" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_granja_raza" INTEGER NOT NULL,

    CONSTRAINT "Granja_pkey" PRIMARY KEY ("id_granja")
);

-- CreateTable
CREATE TABLE "Granja_Raza" (
    "id_granja_raza" SERIAL NOT NULL,
    "id_granja" INTEGER NOT NULL,
    "id_raza" INTEGER NOT NULL,

    CONSTRAINT "Granja_Raza_pkey" PRIMARY KEY ("id_granja_raza")
);

-- CreateTable
CREATE TABLE "Razas" (
    "id_raza" SERIAL NOT NULL,
    "nombre_raza" TEXT[],
    "id_animal" INTEGER,

    CONSTRAINT "Razas_pkey" PRIMARY KEY ("id_raza")
);

-- CreateTable
CREATE TABLE "Animal" (
    "id_animal" SERIAL NOT NULL,
    "nombre_animal" TEXT NOT NULL,

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id_animal")
);

-- CreateTable
CREATE TABLE "_DistribuidoresNegocios" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Corte_nombre_corte_key" ON "Corte"("nombre_corte");

-- CreateIndex
CREATE UNIQUE INDEX "Granja_direccion_key" ON "Granja"("direccion");

-- CreateIndex
CREATE UNIQUE INDEX "Razas_nombre_raza_key" ON "Razas"("nombre_raza");

-- CreateIndex
CREATE UNIQUE INDEX "Animal_nombre_animal_key" ON "Animal"("nombre_animal");

-- CreateIndex
CREATE UNIQUE INDEX "_DistribuidoresNegocios_AB_unique" ON "_DistribuidoresNegocios"("A", "B");

-- CreateIndex
CREATE INDEX "_DistribuidoresNegocios_B_index" ON "_DistribuidoresNegocios"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Negocio" ADD CONSTRAINT "Negocio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Negocio_Distribuidor" ADD CONSTRAINT "Negocio_Distribuidor_id_distribuidor_fkey" FOREIGN KEY ("id_distribuidor") REFERENCES "Distribuidor"("id_distribuidor") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Negocio_Distribuidor" ADD CONSTRAINT "Negocio_Distribuidor_id_negocio_fkey" FOREIGN KEY ("id_negocio") REFERENCES "Negocio"("id_negocio") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Granja_Distribuidor" ADD CONSTRAINT "Granja_Distribuidor_id_distribuidor_fkey" FOREIGN KEY ("id_distribuidor") REFERENCES "Distribuidor"("id_distribuidor") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Granja_Distribuidor" ADD CONSTRAINT "Granja_Distribuidor_id_granja_fkey" FOREIGN KEY ("id_granja") REFERENCES "Granja"("id_granja") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimiento_Entrada" ADD CONSTRAINT "Movimiento_Entrada_id_gd_fkey" FOREIGN KEY ("id_gd") REFERENCES "Granja_Distribuidor"("id_gd") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimiento_Entrada" ADD CONSTRAINT "Movimiento_Entrada_corteId_fkey" FOREIGN KEY ("corteId") REFERENCES "Corte"("id_corte") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimiento_salida" ADD CONSTRAINT "Movimiento_salida_movimientoEntradaId_fkey" FOREIGN KEY ("movimientoEntradaId") REFERENCES "Movimiento_Entrada"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Granja" ADD CONSTRAINT "Granja_id_granja_raza_fkey" FOREIGN KEY ("id_granja_raza") REFERENCES "Granja_Raza"("id_granja_raza") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Granja_Raza" ADD CONSTRAINT "Granja_Raza_id_raza_fkey" FOREIGN KEY ("id_raza") REFERENCES "Razas"("id_raza") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Razas" ADD CONSTRAINT "Razas_id_animal_fkey" FOREIGN KEY ("id_animal") REFERENCES "Animal"("id_animal") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DistribuidoresNegocios" ADD CONSTRAINT "_DistribuidoresNegocios_A_fkey" FOREIGN KEY ("A") REFERENCES "Distribuidor"("id_distribuidor") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DistribuidoresNegocios" ADD CONSTRAINT "_DistribuidoresNegocios_B_fkey" FOREIGN KEY ("B") REFERENCES "Negocio"("id_negocio") ON DELETE CASCADE ON UPDATE CASCADE;
