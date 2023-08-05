// API para registrar un distribuidor con múltiples negocios
// pages/api/auth/distribuidor.js
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

//metodo get para obtener todos los distribuidores
export async function GET() {
  const prisma = new PrismaClient();
  try {
    const distribuidores = await prisma.distribuidor.findMany({
      include: {
        distri_negocio: true,
      },
    });

    return NextResponse.json(distribuidores);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function POST(request) {
  const prisma = new PrismaClient();
  const {
    nombre_distribuidor,
    apellido_distribuidor,
    telefono_distribuidor,
    documento_distribuidor,
    negocios,
  } = await request.json();

  try {
    const distribuidor = await prisma.distribuidor.create({
      data: {
        nombre_distribuidor,
        apellido_distribuidor,
        telefono_distribuidor,
        documento_distribuidor: parseInt(documento_distribuidor),
      },
    });

    //asociar los negocios al distribuidor
    negocios.forEach(async (negocioId) => {
      await prisma.negocio_Distribuidor.create({
        data: {
          id_distribuidor: distribuidor.id_distribuidor,
          id_negocio: negocioId,
        },
      });
    });

    return NextResponse.json(distribuidor);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
