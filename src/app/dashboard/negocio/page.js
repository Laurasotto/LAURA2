'use client'
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Changed from "next/navigation"
import { NextResponse } from "next/server";
import Link from "next/link";

function NegocioPage() {
    const [nombre_negocio, setNombre_negocio] = useState("");
    const [direccion_negocio, setDireccion_negocio] = useState("");
    const { data: session, status } = useSession(); // Added "status" for session loading status
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userRoleId = session?.user?.roleId;

        if (userRoleId !== 1) {
            console.log("No tienes permisos para crear un negocio");
            return new NextResponse(JSON.stringify({
                message: "No tienes permisos para crear un negocio"
            }), {
                status: 400,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } else {
            const res = await fetch("/api/auth/negocio", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nombre_negocio,
                    direccion_negocio,
                    userId: session?.user?.id
                })
            });
            if (res.ok) {
                router.push("/dashboard/profile");
            }
        }
    }

    // Check if session is still loading
    if (status === "loading") {
        return <div>Cargando...</div>;
    }

    // Check if user is logged in
    if (!session || !session.user) {
        return <div>Inicia sesión para acceder a esta página</div>;
    }

    // Check if user roleId is equal to 1
    const userRoleId = session.user.roleId;
    if (userRoleId !== 1) {
        return <div>No tienes permisos para crear un negocio</div>;
    }

    return (
        <div className="justify-center h-[calc(100vh-4rem)] flex flex-col items-center gap-y-5">
            <h1 className="font-bold text-3xl">Crear negocio</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
                <input
                    type="text"
                    name="nombre_negocio"
                    id="nombre_negocio"
                    value={nombre_negocio}
                    onChange={(e) => setNombre_negocio(e.target.value)}
                    placeholder="Nombre del negocio"
                    className="bg-zinc-800 p-4"
                />
                <input
                    type="text"
                    name="direccion_negocio"
                    id="direccion_negocio"
                    value={direccion_negocio}
                    onChange={(e) => setDireccion_negocio(e.target.value)}
                    placeholder="Direccion del negocio"
                    className="bg-zinc-800 p-4"
                />
                <button type="submit" className="bg-zinc-800 px-4 py-2 block">Crear negocio</button>

                <Link href="profile">Volver</Link>

            </form>
        </div>
    );
}

export default NegocioPage;
