import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request) {
    const { username, email, password } = await request.json();
    console.log(username, password, email);

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
    if (!username || username.trim().length === 0) {
        return new NextResponse(JSON.stringify({
            message: "Username cannot be empty"
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
                email,
                username,
                password: hashedPassword
            }
        });

        return new NextResponse(
            JSON.stringify({
                email: user.email,
                username: user.username,
                id: user.id
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
