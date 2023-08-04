import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  const prisma = new PrismaClient();
  const data = await req.json();

  try {
    const newExitMovement = await prisma.movimiento_salida.create({
      data: {
        peso: parseInt(data.peso),
        precio: parseInt(data.precio),
        movimientoEntradaId: parseInt(data.movimientoEntradaId),
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
