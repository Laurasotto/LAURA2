// api/granja.js

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


export async function POST(req) {
  const { nombre_granja, direccion, razas } = req.body;

  // Crear la granja con sus datos básicos
  const granja = await prisma.granja.create({
    data: {
      nombre_granja,
      direccion,
    },
  });

  // Asociar las razas a la granja en la tabla intermedia Granja_Raza
  for (const id_raza of razas) {
    await prisma.granja_Raza.create({
      data: {
        id_granja: granja.id_granja,
        id_raza,
      },
    });
  }

  return new NextResponse(
    JSON.stringify(granja),
    {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

// model Granja {
//     id_granja            Int                   @id @default(autoincrement())
//     nombre_granja        String
//     direccion            String                @unique
//     fecha_creacion       DateTime              @default(now())
//     razas                Granja_Raza           @relation(fields: [id_granja_raza], references: [id_granja_raza], onDelete: Cascade) // Relación muchos a muchos con Categoria_Animal
//     id_granja_raza       Int
//     granjas_distribuidor Granja_Distribuidor[]
//   }
// Obtener todas las granjas
export async function GET(){
    const granjas = await prisma.granja.findMany({
        include: {
        razas: true,
        },
    });
    
    return new NextResponse(
        JSON.stringify(granjas),
        {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
        }
    );
}
