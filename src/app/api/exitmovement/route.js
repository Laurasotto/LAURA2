import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
  const data = await req.json();

  try {
    const newExitMovement = await prisma.movimiento_salida.create({
      data: {
        peso: parseInt(data.peso),
        precio: parseInt(data.precio),
        movimientoEntrada: {
          connect: {
            id: parseInt(data.entryMovementId),
          },
        },
      },
    });

    return NextResponse.json(newExitMovement);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: error.message,
    });
  }
}

export async function GET() {
  try {
    const exitMovements = await prisma.movimiento_salida.findMany({
      include: {
        movimientoEntrada: {
          include: {
            corte: {
              select: {
                nombre_corte: true,
              },
            },
            distribuidor: {
              select: {
                nombre_distribuidor: true,
              },
            },
            granja: {
              select: {
                Granja: {
                  select: {
                    nombre_granja: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return NextResponse.json(exitMovements);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: error.message,
    });
  }
}
