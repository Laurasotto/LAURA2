import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const cortes = await prisma.corte.findMany();

    return NextResponse.json(cortes);
  } catch (error) {
    return NextResponse.json(error);
  }
}
