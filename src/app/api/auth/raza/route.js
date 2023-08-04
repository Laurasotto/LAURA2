// pages/api/negocio.js
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { useSession } from "next-auth/react";

const prisma = new PrismaClient();

// model Razas {
//     id_raza     Int           @id @default(autoincrement()) // Cambiar el tipo a Int
//     nombre_raza String[]      @unique
//     Animal      Animal?       @relation(fields: [id_animal], references: [id_animal])
//     id_animal   Int? // Creamos un índice único para reemplazar la PK
//     granja_raza Granja_Raza[]
//   }

// post para crear mas de una raza con await req.json()
export async function POST(request) {
    const { nombre_raza, id_animal } = await request.json();
    console.log(nombre_raza);
    console.log(id_animal);

    const raza = await prisma.razas.create({
        data: {
            nombre_raza,
            id_animal: Number(id_animal),
        },
    });

    return new NextResponse(
        JSON.stringify(raza),
        {
            status: 201,
            headers: {
                "Content-Type": "application/json",
            },

        }
    );
}

        

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
