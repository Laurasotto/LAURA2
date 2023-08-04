// pages/api/negocio.js
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { useSession } from "next-auth/react";

const prisma = new PrismaClient();

// model Animal {
//     id_animal     Int     @id @default(autoincrement())
//     nombre_animal String  @unique
//     Raza          Razas[]
//   }



//funcion para obtener los animales

export async function GET() {
    const animal = await prisma.animal.findMany({
        select: {
            id_animal: true,
            nombre_animal: true,
        }
    });
    return new NextResponse(
        JSON.stringify(animal),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
}












export async function POST(request) {
    
    const { nombre_animal} = await request.json();
    console.log(nombre_animal);

    //validaciones de nombre
        if (!nombre_animal || nombre_animal.trim().length === 0) {
        return new NextResponse(JSON.stringify({
            message: "Nombre cannot be empty"
        }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
    

    const animal = await prisma.animal.create({
        data: {
            nombre_animal,
           
        }
    });
    return new NextResponse(
        JSON.stringify({
            nombre_animal: animal.nombre_animal,
           
        }),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
}
