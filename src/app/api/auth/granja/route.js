// api/granja.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
//obtener todas las razas

export async function GET() {
  try {
    const razas = await prisma.razas.findMany({
      include: {
        Animal: true,
      },
    });
    return NextResponse.json(razas);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

// model Granja {
//     id_granja            Int                   @id @default(autoincrement())
//     nombre_granja        String
//     direccion            String                 @unique
//     fecha_creacion       DateTime              @default(now())
//     razas             Razas? @relation(fields: [id_raza], references: [id_raza], onDelete: Cascade) // Relación muchos a muchos con Categoria_Animal
//     id_raza            Int // Creamos un índice único para reemplazar la PK
//     granjas_distribuidor Granja_Distribuidor[]
//     granja_raza          Granja_Raza[]
//   }

//que el post sea para crear una granja con

export async function POST(request) {
  const { nombre_granja, direccion, id_raza } = await request.json();
  try {
    const granja = await prisma.granjas.create({
      data: {
        nombre_granja,
        direccion,
        id_raza: id_raza,
      },
    });
    return NextResponse.json(granja);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
