// api/granja.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
//obtener todas las razas

const prisma = new PrismaClient();
export async function GET() {
  try {
    const granjas = await prisma.granja.findMany();
    return NextResponse.json(granjas);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

// model Granja {
//     id_granja            Int                   @id @default(autoincrement())
//     nombre_granja        String
//     direccion            String                 @unique
//     fecha_creacion       DateTime              @default(now())
//     razas                Granja_Raza           @relation(fields: [id_granja_raza], references: [id_granja_raza], onDelete: Cascade) // Relación muchos a muchos con Categoria_Animal
//     id_granja_raza       Int
//     granjas_distribuidor Granja_Distribuidor[]
//   }

//que el post sea para crear una granja con

export async function POST(request) {
  const { nombre_granja, direccion, id_raza } = await request.json();

  try {
    const granja = await prisma.granja.create({
      data: {
        nombre_granja,
        direccion,
      },
    });

    id_raza.forEach(async (id) => {
      await prisma.granjaRazas.create({
        data: {
          id_granja: granja.id_granja,
          id_raza: id,
        },
      });
    });

    return NextResponse.json(granja);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
