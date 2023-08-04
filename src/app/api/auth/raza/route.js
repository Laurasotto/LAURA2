// pages/api/negocio.js
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { useSession } from "next-auth/react";

const prisma = new PrismaClient();

export async function POST(request) {
    
    const {nombre_raza,id_animal} = await request.json();
    console.log(nombre_raza,id_animal);

    //validaciones de nombre, direccion y userId
    
    if (!nombre_raza || nombre_raza.trim().length === 0) {
        return new NextResponse(JSON.stringify({
            message: "Nombre cannot be empty"
        }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
   
    try {
        
        await prisma.$connect();
        const razaFound = await prisma.razas.findUnique({ where: { nombre_raza } });
        
        if (razaFound) {
            return new NextResponse(JSON.stringify({
                message: "Raza already exists"
            }), {
                status: 409,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }
    const raza = await prisma.razas.create({
        data: {
            nombre_raza,
            id_animal
             
        }
    });
    return new NextResponse(
        JSON.stringify({
            nombre_raza:raza.nombre_raza,
            id_animal: raza.id_animal
          
        }),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
} catch (error) {
    console.log(error);
    if (error instanceof Error) {
        return new NextResponse(JSON.stringify({
            message: error.message
        }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } else {
        // Si el error no es una instancia de Error, maneja el error de otra manera (opcional).
        return new NextResponse(JSON.stringify({
            message: "An unexpected error occurred"
        }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}
}
export async function GET() {
    const razas = await prisma.razas.findMany({
        select: {
            id_raza: true,
            nombre_raza: true,
            id_animal: true,
        }
    });
    return new NextResponse(
        JSON.stringify(razas),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
}






