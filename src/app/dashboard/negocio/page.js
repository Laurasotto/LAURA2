'use client'
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import './negocio.css'

function NegocioPage() {
  const [nombre_negocio, setNombre_negocio] = useState("");
  const [direccion_negocio, setDireccion_negocio] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();
  const [negociosData, setNegociosData] = useState([]);
  const [showNegocios, setShowNegocios] = useState(false);

  const getNegociosData = async () => {
    try {
      const res = await axios.get("/api/auth/negocio");
      setNegociosData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Llamada a la API para obtener los datos de la tabla "Negocio"
    getNegociosData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userRoleId = session?.user?.roleId;

    if (userRoleId !== 1) {
      console.log("No tienes permisos para crear un negocio");
      return;
    }

    try {
      const res = await fetch("/api/auth/negocio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre_negocio,
          direccion_negocio,
          userId: session?.user?.id,
        }),
      });
      if (res.ok) {
        router.push("/dashboard/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleToggleNegocios = () => {
    setShowNegocios((prevState) => !prevState);
  };

  return (
    <div className="section" >
      <div className="form2">
        <h1 className="h1">Crear negocio</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
          <input
            type="text"
            name="nombre_negocio"
            id="nombre_negocio"
            value={nombre_negocio}
            onChange={(e) => setNombre_negocio(e.target.value)}
            placeholder="Nombre del negocio"
            className="input w-input"
          />
          <input
            type="text"
            name="direccion_negocio"
            id="direccion_negocio"
            value={direccion_negocio}
            onChange={(e) => setDireccion_negocio(e.target.value)}
            placeholder="Direccion del negocio"
            className="input w-input"
          />
          <button type="submit" className="button-crear">
            Crear negocio
          </button>

          <Link className="button-login" href="/dashboard/profile">Volver</Link>
        </form>
      </div>
      <button
        onClick={handleToggleNegocios}
        className="mostrarnego"
      >
        {showNegocios ? "Ocultar negocios" : "Mostrar negocios"}
      </button>
      {showNegocios && (
        <div className="contenedor-tabla">
          <h2 className="text-prin">Tabla de Negocios</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border">ID</th>
                <th className="py-2 px-4 border">Nombre del Negocio</th>
                <th className="py-2 px-4 border">Dirección del Negocio</th>
                <th className="py-2 px-4 border">Fecha de Creación</th>
              </tr>
            </thead>
            <tbody>
              {negociosData.map((negocio) => (
                <tr key={negocio.id_negocio} className="border">
                  <td className="py-2 px-4 border">{negocio.id_negocio}</td>
                  <td className="py-2 px-4 border">{negocio.nombre_negocio}</td>
                  <td className="py-2 px-4 border">{negocio.direccion_negocio}</td>
                  <td className="py-2 px-4 border">{negocio.fecha_creacion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default NegocioPage;