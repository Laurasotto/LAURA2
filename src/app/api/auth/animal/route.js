// pages/api/negocio.js
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request) {
  const prisma = new PrismaClient();
  const { nombre_animal } = await request.json();
  console.log(nombre_animal);

  //validaciones de nombre
  try {
    if (!nombre_animal || nombre_animal.trim().length === 0) {
      return NextResponse.json(
        { message: "Nombre cannot be empty" },
        { status: 400 }
      );
    }

    const animal = await prisma.animal.create({
      data: {
        nombre_animal,
      },
    });

    return NextResponse.json(animal.nombre_animal);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function GET() {
  const prisma = new PrismaClient();
  try {
    const animal = await prisma.animal.findMany({
      select: {
        id_animal: true,
        nombre_animal: true,
      },
    });

    return NextResponse.json(animal);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
