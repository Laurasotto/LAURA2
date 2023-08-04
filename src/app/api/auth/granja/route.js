// api/granja.js

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();
//obtener todas las razas 

export async function GET() {
    const razas = await prisma.razas.findMany({
        include: {
            Animal: true,
        },
    });
    return new NextResponse(
        JSON.stringify(razas),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
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
    const { nombre_granja, direccion, id_raza } = await request.body.json();
    const granja = await prisma.granjas.create({
        data: {
            nombre_granja,
            direccion,
            id_raza: id_raza,
        },
    });
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


