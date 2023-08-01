-- CreateTable
CREATE TABLE "Negocio" (
    "id_negocio" TEXT NOT NULL,
    "id_distribuidor" TEXT NOT NULL,
    "nombre_negocio" TEXT NOT NULL,
    "direccion_negocio" TEXT NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Negocio_pkey" PRIMARY KEY ("id_negocio")
);

-- CreateTable
CREATE TABLE "Movimiento_Entrada" (
    "id_mov_entra" TEXT NOT NULL,
    "id_negocio" TEXT NOT NULL,
    "id_granja_distri" TEXT NOT NULL,
    "id_corte" TEXT NOT NULL,
    "id_tipo_corte" TEXT NOT NULL,
    "precio_entrada" INTEGER NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Movimiento_Entrada_pkey" PRIMARY KEY ("id_mov_entra")
);

-- CreateTable
CREATE TABLE "Movimiento_Salida" (
    "id_salida" TEXT NOT NULL,
    "id_negocio" TEXT NOT NULL,
    "id_distribuidor" TEXT NOT NULL,
    "id_corte" TEXT NOT NULL,
    "cantidad_salida" INTEGER NOT NULL,
    "fecha_salida" TIMESTAMP(3) NOT NULL,
    "id_raza" TEXT NOT NULL,

    CONSTRAINT "Movimiento_Salida_pkey" PRIMARY KEY ("id_salida")
);

-- CreateTable
CREATE TABLE "Distribuidor" (
    "id_distribuidor" TEXT NOT NULL,
    "nombre_distribuidor" TEXT NOT NULL,
    "apellido_distribuidor" TEXT NOT NULL,
    "telefono_distribuidor" TEXT NOT NULL,
    "documento_distribuidor" INTEGER NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Distribuidor_pkey" PRIMARY KEY ("id_distribuidor")
);

-- CreateTable
CREATE TABLE "Granja_Distribuidor" (
    "id_granja_distri" TEXT NOT NULL,
    "fecha_entrada" TIMESTAMP(3) NOT NULL,
    "id_distribuidor" TEXT NOT NULL,
    "id_granja" TEXT NOT NULL,

    CONSTRAINT "Granja_Distribuidor_pkey" PRIMARY KEY ("id_granja_distri")
);

-- CreateTable
CREATE TABLE "Corte" (
    "id_corte" TEXT NOT NULL,
    "id_tipo_corte" TEXT NOT NULL,
    "id_raza" TEXT NOT NULL,
    "id_categoria" TEXT NOT NULL,
    "presentacion" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Corte_pkey" PRIMARY KEY ("id_corte")
);

-- CreateTable
CREATE TABLE "Razas" (
    "id_raza" TEXT NOT NULL,
    "id_categoria" TEXT NOT NULL,
    "nombre_raza" TEXT NOT NULL,

    CONSTRAINT "Razas_pkey" PRIMARY KEY ("id_raza")
);

-- CreateTable
CREATE TABLE "Categoria_Animal" (
    "id_categoria" TEXT NOT NULL,
    "nombre_categoria" TEXT NOT NULL,

    CONSTRAINT "Categoria_Animal_pkey" PRIMARY KEY ("id_categoria")
);

-- CreateTable
CREATE TABLE "Tipo_Corte" (
    "id_tipo_corte" TEXT NOT NULL,
    "id_raza" TEXT NOT NULL,
    "id_categoria" TEXT NOT NULL,
    "presentacion" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tipo_Corte_pkey" PRIMARY KEY ("id_tipo_corte")
);

-- CreateTable
CREATE TABLE "Granja" (
    "id_granja" TEXT NOT NULL,
    "id_categoria" TEXT NOT NULL,
    "nombre_granja" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Granja_pkey" PRIMARY KEY ("id_granja")
);

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
