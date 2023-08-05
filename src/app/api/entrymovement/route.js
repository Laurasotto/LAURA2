import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  const prisma = new PrismaClient();
  const data = await req.json();

  try {
    const newEntryMovement = await prisma.movimiento_Entrada.create({
      data: {
        peso: parseInt(data.peso),
        precio: parseInt(data.precio),
        corte: {
          connect: {
            id_corte: parseInt(data.corteId),
          },
        },
        distribuidor: {
          connect: {
            id_distribuidor: parseInt(data.distribuidorId),
          },
        },
        granja: {
          connect: {
            id: parseInt(data.granjaId),
          },
        },
      },
    });

    return NextResponse.json(newEntryMovement);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: error.message,
    });
  }
}
