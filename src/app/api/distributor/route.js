import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  const prisma = new PrismaClient();
  const data = await req.json();

  try {
    const newDistributor = await prisma.distribuidor.create({
      data: {
        nombre_distribuidor: data.nombre,
        apellido_distribuidor: data.apellido,
        telefono_distribuidor: data.telefono,
        documento_distribuidor: parseInt(data.documento),
      },
    });

    return NextResponse.json(newDistributor);
  } catch (error) {
    return NextResponse.json({
      error: error.message,
    });
  }
}
