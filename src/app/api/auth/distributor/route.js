// API para registrar un distribuidor con múltiples negocios
// pages/api/auth/distribuidor.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//metodo get para obtener todos los distribuidores
export async function GET() {
  try {
    const distribuidores = await prisma.distribuidor.findMany({
      include: {
        distri_negocio: true,
      },
    });

    return NextResponse.json(distribuidores);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function POST(request) {
  const {
    nombre_distribuidor,
    apellido_distribuidor,
    telefono_distribuidor,
    documento_distribuidor,
    negocios,
  } = await request.json();
  console.log(nombre_distribuidor);
  console.log(apellido_distribuidor);
  console.log(telefono_distribuidor);
  console.log(documento_distribuidor);
  console.log(negocios);

  try {
    const distribuidor = await prisma.distribuidor.create({
      data: {
        nombre_distribuidor,
        apellido_distribuidor,
        telefono_distribuidor,
        documento_distribuidor,
        distri_negocio: {
          create: negocios.map((negocioId) => ({
            negocio: { connect: { id_negocio: negocioId } },
          })),
        },
      },
      include: {
        distri_negocio: true,
      },
    });

    return NextResponse.json(distribuidor);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
