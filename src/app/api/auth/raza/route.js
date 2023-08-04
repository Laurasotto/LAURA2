// pages/api/negocio.js
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { useSession } from "next-auth/react";

const prisma = new PrismaClient();

export async function POST(request) {
  const { nombre_raza, id_animal } = await request.json();
  console.log(nombre_raza, id_animal);

  //validaciones de nombre, direccion y userId

  try {
    if (!nombre_raza || nombre_raza.trim().length === 0) {
      return NextResponse.json(
        {
          message: "Nombre cannot be empty",
        },
        {
          status: 400,
        }
      );
    }

    const razaFound = await prisma.razas.findUnique({ where: { nombre_raza } });

    if (razaFound) {
      return NextResponse.json(
        {
          message: "Raza already exists",
        },
        {
          status: 409,
        }
      );
    }

    const raza = await prisma.razas.create({
      data: {
        nombre_raza,
        id_animal,
      },
    });

    return NextResponse.json({
      nombre_raza: raza.nombre_raza,
      id_animal: raza.id_animal,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function GET() {
  try {
    const razas = await prisma.razas.findMany({
      select: {
        id_raza: true,
        nombre_raza: true,
        id_animal: true,
      },
    });
    return NextResponse.json(razas);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
