import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
  const prisma = new PrismaClient();
  const { nombre, apellido, telefono, documento, email, password, roleId } =
    await request.json();
  //crear roles para hacer un select en el formulario del rol
  const roles = await prisma.role.findMany();
  console.log(roles);
  console.log(nombre, apellido, telefono, documento, password, email, roleId);

  try {
    // Validación para asegurarse de que el campo password no esté vacío
    if (!password || password.length < 6) {
      return NextResponse.json(
        {
          message: "Password must be at least 6 characters",
        },
        {
          status: 400,
        }
      );
    }

    // Validación para asegurarse de que el campo email no esté vacío
    if (!email || email.trim().length === 0) {
      return NextResponse.json(
        {
          message: "Email cannot be empty",
        },
        {
          status: 400,
        }
      );
    }
    //validacion del rol
    if (!roleId || roleId.trim().length === 0) {
      return NextResponse.json(
        {
          message: "Role cannot be empty",
        },
        {
          status: 400,
        }
      );
    }

    //validar, nombre, apellido, telefono, documento
    if (!nombre || nombre.trim().length === 0) {
      return NextResponse.json(
        {
          message: "Nombre cannot be empty",
        },
        {
          status: 400,
        }
      );
    }

    if (!apellido || apellido.trim().length === 0) {
      return NextResponse.json(
        {
          message: "Apellido cannot be empty",
        },
        {
          status: 400,
        }
      );
    }

    if (!telefono || telefono.trim().length === 0) {
      return NextResponse.json(
        {
          message: "Telefono cannot be empty",
        },
        {
          status: 400,
        }
      );
    }

    if (!documento || documento.trim().length === 0) {
      return NextResponse.json(
        {
          message: "Documento cannot be empty",
        },
        {
          status: 400,
        }
      );
    }

    const userFound = await prisma.user.findUnique({ where: { email } });

    if (userFound) {
      return NextResponse.json(
        {
          message: "Email already exists",
        },
        {
          status: 409,
        }
      );
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
        roleId: parseInt(roleId),
      },
    });

    return NextResponse.json({
      nombre: user.nombre,
      apellido: user.apellido,
      telefono: user.telefono,
      documento: user.documento,
      email: user.email,
      id: user.id,
      roleId: user.roleId,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
