import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const prisma = new PrismaClient();
  try {
    const granjaRaza = await prisma.granjaRazas.findMany({
      include: {
        Granja: {
          select: {
            nombre_granja: true,
          },
        },
      },
    });
    return NextResponse.json(granjaRaza);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
