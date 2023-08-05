// api/entrymovement.js
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
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

export async function GET() {
  try {
    const entryMovements = await prisma.movimiento_Entrada.findMany({
      include: {
        corte: {
          select: {
            nombre_corte: true,
          },
        },
        distribuidor: true,
        granja: {
          select: {
            Granja: true,
          },
        },
      },
    });

    return NextResponse.json(entryMovements);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
