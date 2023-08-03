'use client'

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function NegocioPage() {
    const [nombre_negocio, setNombre_negocio] = useState("");
    const [direccion_negocio, setDireccion_negocio] = useState("");
    const { data: session } = useSession();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
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
        })
        if (res.ok) {
            router.push("/dashboard/profile");
        }
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
            </form>
        </div>
    );
}


export default NegocioPage;




