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
        id_gd: parseInt(data.id_gd),
        id_corte: parseInt(data.id_corte),
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
