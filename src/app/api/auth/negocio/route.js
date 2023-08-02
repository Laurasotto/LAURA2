// pages/api/negocio.js

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    const data = await req.json();
    const prisma = new PrismaClient();

    try {
        const negocio = await prisma.negocio.create({
            data: {
                id_negocio: data.id_negocio,
                id_distribuidor: data.id_distribuidor,
                nombre_negocio: data.nombre_negocio,
                direccion_negocio: data.direccion_negocio,
                fecha_creacion: new Date(), // Geneara la fecha y hora actual
            }
        });

        return NextResponse.json(negocio);
    } catch (error) {
        console.log(error);
        return NextResponse.json(error);
    } finally {
        await prisma.$disconnect();
    }
};

export default POST;
