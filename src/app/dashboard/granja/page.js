"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

// Formulario para crear una granja con varias razas

export default function GranjaForm() {
  const [nombre_granja, setNombre_granja] = useState("");
  const [direccion, setDireccion] = useState("");
  const [razas, setRazas] = useState([]);
  const [selectedRazas, setSelectedRazas] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();

  const getRazasGranja = async () => {
    const response = await axios.get("/api/auth/granja");
    setRazas(response.data);
  };

  useEffect(() => {
    getRazasGranja();
  }, []);

  const handleCheckboxChange = (id_raza) => {
    setSelectedRazas((prevSelectedRazas) =>
      prevSelectedRazas.includes(id_raza)
        ? prevSelectedRazas.filter((raza) => raza !== id_raza)
        : [...prevSelectedRazas, id_raza]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const granja = {
      nombre_granja,
      direccion,
      id_razas: selectedRazas,
    };
    try {
      const res = await axios.post("/api/auth/granja", granja);

      router.push("/dashboard/granja");
      console.log(res);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Crear Granja</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-8 border shadow-md rounded-lg"
      >
        <div className="mb-4">
          <label
            htmlFor="nombre_granja"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Nombre de la Granja
          </label>
          <input
            type="text"
            id="nombre_granja"
            name="nombre_granja"
            value={nombre_granja}
            onChange={(e) => setNombre_granja(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Nombre de la Granja"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="direccion"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Dirección
          </label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Dirección"
          />
        </div>
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2">
            Seleccione una o varias razas:
          </label>
          {razas.map((raza) => (
            <div
              key={raza.id_raza}
              className="flex text-black items-center mb-2"
            >
              <input
                type="checkbox"
                name="razas"
                value={raza.id_raza}
                checked={selectedRazas.includes(raza.id_raza)}
                onChange={() => handleCheckboxChange(raza.id_raza)}
                className="mr-2"
              />
              <label htmlFor={`raza-${raza.id_raza}`}>{raza.nombre_raza}</label>
            </div>
          ))}
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Crear
          </button>
          <Link
            href="/dashboard/granja"
            className="text-blue-500 hover:underline"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
