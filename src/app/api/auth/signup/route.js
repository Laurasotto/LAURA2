import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request) {
    const { nombre,apellido,telefono,documento, email, password, roleId } = await request.json();
    //crear roles para hacer un select en el formulario del rol
    const roles = await prisma.role.findMany();
    console.log(roles);
    console.log(nombre,apellido,telefono,documento, password, email, roleId);

    // Validación para asegurarse de que el campo password no esté vacío
    if (!password || password.length < 6) {
        return new NextResponse(JSON.stringify({
            message: "Password must be at least 6 characters"
        }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
    

    // Validación para asegurarse de que el campo email no esté vacío
    if (!email || email.trim().length === 0) {
        return new NextResponse(JSON.stringify({
            message: "Email cannot be empty"
        }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
    //validacion del rol
    if (!roleId || roleId.trim().length === 0) {
        return new NextResponse(JSON.stringify({
            message: "Role cannot be empty"
        }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
    
    //validar, nombre, apellido, telefono, documento
    if (!nombre || nombre.trim().length === 0) {
        return new NextResponse(JSON.stringify({
            message: "Nombre cannot be empty"
        }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
    if (!apellido || apellido.trim().length === 0) {
        return new NextResponse(JSON.stringify({
            message: "Apellido cannot be empty"
        }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
    if (!telefono || telefono.trim().length === 0) {
        return new NextResponse(JSON.stringify({
            message: "Telefono cannot be empty"
        }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
    if (!documento || documento.trim().length === 0) {
        return new NextResponse(JSON.stringify({
            message: "Documento cannot be empty"
        }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }




    try {
        
        await prisma.$connect();
        const userFound = await prisma.user.findUnique({ where: { email } });
        
        if (userFound) {
            return new NextResponse(JSON.stringify({
                message: "Email already exists"
            }), {
                status: 409,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                nombre,
                apellido,
                telefono,
                documento: parseInt(documento),
                email,
                password: hashedPassword,
                roleId: parseInt(roleId)
            }
        });

        return new NextResponse(
            JSON.stringify({
                nombre: user.nombre,
                apellido: user.apellido,
                telefono: user.telefono,
                documento: user.documento,
                email: user.email,
                id: user.id,
                roleId: user.roleId
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );


    } catch (error) {
        console.log(error);
        if(error instanceof Error)
        return new NextResponse(JSON.stringify({
            message: error.message
        }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}