// pages/api/negocio.js
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request) {
  const prisma = new PrismaClient();
  const { nombre_negocio, direccion_negocio, userId } = await request.json();
  console.log(nombre_negocio, direccion_negocio, userId);

  //validaciones de nombre, direccion y userId

  try {
    if (!nombre_negocio || nombre_negocio.trim().length === 0) {
      return NextResponse.json(
        {
          message: "Nombre cannot be empty",
        },
        {
          status: 400,
        }
      );
    }

    if (!direccion_negocio || direccion_negocio.trim().length === 0) {
      return NextResponse.json(
        {
          message: "Direccion cannot be empty",
        },
        {
          status: 400,
        }
      );
    }

    const negocio = await prisma.negocio.create({
      data: {
        nombre_negocio,
        direccion_negocio,
        userId,
      },
    });

    return NextResponse.json({
      nombre_negocio: negocio.nombre_negocio,
      direccion_negocio: negocio.direccion_negocio,
      userId: negocio.userId,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function GET() {
  const prisma = new PrismaClient();
  try {
    const negocios = await prisma.negocio.findMany();

    return NextResponse.json(negocios);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
