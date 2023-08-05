"use client";
import useExitMovement from "@/hooks/useExitMovement";
import { useEffect, useState } from "react";
import "./movimientosalida.css";

export default function ExitMovement() {
  const {
    exitMovement,
    handleChange,
    handleSubmit,
    getExitMovement,
    getEntryMovement,
  } = useExitMovement();
  const [fetchExitMovement, setFetchExitMovement] = useState([]);
  const [entryMovement, setEntryMovement] = useState([]);

  useEffect(() => {
    const fetchExitMovement = async () => {
      const res = await getExitMovement();
      setFetchExitMovement(res);
    };

    fetchExitMovement();
  }, []);

  console.log(fetchExitMovement);

  return (
    <div className="section">
      <h1 class="h1-movimiento">Crear movimiento salida</h1>
      <div className="form3">
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            justifyContent: "center",
            color: "#000",
          }}
          onSubmit={handleSubmit}
        >
          <label className="label-entrada">Peso</label>
          <input
            type="number"
            name="peso"
            placeholder="peso"
            onChange={handleChange}
            value={exitMovement.peso}
            required
            className="input w-input"
          />
          <label className="label-entrada">Precio</label>
          <input
            type="number"
            name="precio"
            placeholder="precio"
            onChange={handleChange}
            value={exitMovement.precio}
            required
            className="input w-input"
          />
          <select
            name="entryMovementId"
            placeholder="entryMovementId"
            onChange={handleChange}
            value={exitMovement.entryMovementId}
            required
            className="select-entrada"
          >
            <option value="">Movimiento entrada</option>
            {fetchExitMovement.map((exit, i) => (
              <option key={i} value={exit.movimientoEntrada.id}>
                {new Date(exit.movimientoEntrada.fecha).toLocaleString("es-CO")}{" "}
                {exit.movimientoEntrada.corte.nombre_corte}
              </option>
            ))}
          </select>
          <button className="button-enviar-entrada">Enviar</button>
        </form>
      </div>
      {/* Table to display entry movements */}
      <div className="contenedor-1000">
        <table className="w-full border-collapse">
          {/* Table headers */}
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Peso</th>
              <th className="py-2 px-4 border">Precio</th>
              <th className="py-2 px-4 border">Movimiento Entrada - Granja</th>
              <th className="py-2 px-4 border">
                Movimiento Entrada - Disribuidor
              </th>
              <th className="py-2 px-4 border">Fecha</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {fetchExitMovement?.map((exit) => (
              <tr key={exit.id}>
                <td className="py-2 px-4 border">{exit.id}</td>
                <td className="py-2 px-4 border">{exit.peso}</td>
                <td className="py-2 px-4 border">{exit.precio}</td>
                <td className="py-2 px-4 border">
                  {exit.movimientoEntrada.granja.Granja.nombre_granja}
                </td>
                <td className="py-2 px-4 border">
                  {exit.movimientoEntrada.distribuidor.nombre_distribuidor}
                </td>
                <td className="py-2 px-4 border">
                  {new Date(exit.fecha).toLocaleString("es-CO")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
