// pages/api/negocio.js
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { useSession } from "next-auth/react";

const prisma = new PrismaClient();

export async function POST(request) {
    
    const { nombre_negocio, direccion_negocio,userId} = await request.json();
    console.log(nombre_negocio, direccion_negocio, userId);

    //validaciones de nombre, direccion y userId
    
    if (!nombre_negocio || nombre_negocio.trim().length === 0) {
        return new NextResponse(JSON.stringify({
            message: "Nombre cannot be empty"
        }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
    if (!direccion_negocio || direccion_negocio.trim().length === 0) {
        return new NextResponse(JSON.stringify({
            message: "Direccion cannot be empty"
        }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

   

    const negocio = await prisma.negocio.create({
        data: {
            nombre_negocio,
            direccion_negocio,
            userId, 
        }
    });
    return new NextResponse(
        JSON.stringify({
            nombre_negocio: negocio.nombre_negocio,
            direccion_negocio: negocio.direccion_negocio,
            userId: negocio.userId,
        }),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
}







