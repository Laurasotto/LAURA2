"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const DistribuidorForm = () => {
  const [nombreDistribuidor, setNombreDistribuidor] = useState("");
  const [apellidoDistribuidor, setApellidoDistribuidor] = useState("");
  const [telefonoDistribuidor, setTelefonoDistribuidor] = useState("");
  const [documentoDistribuidor, setDocumentoDistribuidor] = useState("");
  const [negocios, setNegocios] = useState([]);
  const [selectedNegocios, setSelectedNegocios] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [distribuidores, setDistribuidores] = useState([]);

  const getNegocios = async () => {
    try {
      const response = await axios.get("/api/auth/negocio");
      setNegocios(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNegocios();
  }, []);

  const getDistribuidores = async () => {
    try {
      const response = await axios.get("/api/auth/distributor");
      setDistribuidores(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDistribuidores();
  }, []);

  const handleCheckboxChange = (idNegocio) => {
    setSelectedNegocios((prevSelectedNegocios) =>
      prevSelectedNegocios.includes(idNegocio)
        ? prevSelectedNegocios.filter((negocio) => negocio !== idNegocio)
        : [...prevSelectedNegocios, idNegocio]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombreDistribuidor || nombreDistribuidor.trim().length === 0) {
      setError("El nombre del distribuidor no puede estar vacío");
      return;
    }

    if (!apellidoDistribuidor || apellidoDistribuidor.trim().length === 0) {
      setError("El apellido del distribuidor no puede estar vacío");
      return;
    }

    if (!telefonoDistribuidor || telefonoDistribuidor.trim().length === 0) {
      setError("El teléfono del distribuidor no puede estar vacío");
      return;
    }

    if (!documentoDistribuidor || documentoDistribuidor.trim().length === 0) {
      setError("El documento del distribuidor no puede estar vacío");
      return;
    }

    try {
      const res = await axios.post("/api/auth/distributor", {
        nombre_distribuidor: nombreDistribuidor,
        apellido_distribuidor: apellidoDistribuidor,
        telefono_distribuidor: telefonoDistribuidor,
        documento_distribuidor: documentoDistribuidor,
        negocios: selectedNegocios,
      });

      setNombreDistribuidor("");
      setApellidoDistribuidor("");
      setTelefonoDistribuidor("");
      setDocumentoDistribuidor("");
      setSelectedNegocios([]);

      setMensaje("Distribuidor registrado exitosamente: " + res.data.nombre_distribuidor);
    } catch (error) {
      setMensaje("");
      setError("Hubo un error al comunicarse con el servidor.");
    }
  };
  

  return (
    <div className="flex gap-6">
      <form className="w-96 p-4 border rounded shadow" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">Crear Distribuidor</h2>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-1">Nombre del distribuidor:</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={nombreDistribuidor}
            onChange={(e) => setNombreDistribuidor(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-1">Apellido del distribuidor:</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={apellidoDistribuidor}
            onChange={(e) => setApellidoDistribuidor(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-1">Teléfono del distribuidor:</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={telefonoDistribuidor}
            onChange={(e) => setTelefonoDistribuidor(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-1">Documento del distribuidor:</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={documentoDistribuidor}
            onChange={(e) => setDocumentoDistribuidor(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-1">Seleccione negocios asociados:</label>
          {negocios.map((negocio) => (
            <div className="flex items-center mb-2" key={negocio.id_negocio}>
              <input
                type="checkbox"
                checked={selectedNegocios.includes(negocio.id_negocio)}
                onChange={() => handleCheckboxChange(negocio.id_negocio)}
                className="mr-2"
              />
              <label htmlFor={`negocio-${negocio.id_negocio}`}>{negocio.nombre_negocio}</label>
            </div>
          ))}
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {mensaje && <p className="text-green-500 text-sm mb-4">{mensaje}</p>}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Guardar Distribuidor
        </button>
      </form>

      <div className="flex flex-col flex-grow">
        <h2 className="text-xl font-bold mb-4">Distribuidores</h2>
        <table className="table-auto border-collapse border w-full">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Nombre</th>
              <th className="border p-2">Apellido</th>
              <th className="border p-2">Teléfono</th>
              <th className="border p-2">Documento</th>
            </tr>
          </thead>
          <tbody>
            {distribuidores.map((distribuidor) => (
              <tr key={distribuidor.id_distribuidor}>
                <td className="border p-2">{distribuidor.id_distribuidor}</td>
                <td className="border p-2">{distribuidor.nombre_distribuidor}</td>
                <td className="border p-2">{distribuidor.apellido_distribuidor}</td>
                <td className="border p-2">{distribuidor.telefono_distribuidor}</td>
                <td className="border p-2">{distribuidor.documento_distribuidor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DistribuidorForm;