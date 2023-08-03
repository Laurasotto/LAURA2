import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req) {
    const prisma = new PrismaClient()
    const data = await req.json()

    try {
        
    } catch (error) {
        
    }

}