"use client";
import React, { useEffect, useState } from "react";
import useSubmitNewEntryMovement from "@/hooks/useSubmitNewEntryMovement";
import "./movimientoentra.css";

export default function MovementPage() {
  const {
    entryMovement,
    handleChange,
    handleSubmit,
    getDistribuidor,
    getCorte,
    getGranja,
  } = useSubmitNewEntryMovement();
  const [distribuidor, setDistribuidor] = useState([]);
  const [corte, setCorte] = useState([]);
  const [granja, setGranja] = useState([]);
  const [entryMovements, setEntryMovements] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const distribuidorRes = await getDistribuidor();
        setDistribuidor(distribuidorRes.data);

        const corteRes = await getCorte();
        setCorte(corteRes.data);

        const granjaRes = await getGranja();
        setGranja(granjaRes.data);

        const entryMovementsRes = await fetch("/api/entrymovement");
        const entryMovementsData = await entryMovementsRes.json();
        setEntryMovements(entryMovementsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="section">
      <h1 class="h1-movimiento">Crear movimiento entrada</h1>
      <div className="form3">
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
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
            value={entryMovement.peso}
            required
            className="input w-input"
          />
          <label className="label-entrada">Precio</label>
          <input
            type="number"
            name="precio"
            placeholder="precio"
            onChange={handleChange}
            value={entryMovement.precio}
            required
            className="input w-input"
          />
          <select
            name="distribuidorId"
            placeholder="distribuidorId"
            onChange={handleChange}
            value={entryMovement.distribuidorId}
            required
            className="select-entrada"
          >
            <option value="">Distribuidor</option>
            {distribuidor?.map((d) => (
              <option key={d.id_distribuidor} value={d.id_distribuidor}>
                {d.nombre_distribuidor}
              </option>
            ))}
          </select>
          <select
            name="corteId"
            placeholder="corteId"
            onChange={handleChange}
            value={entryMovement.corteId}
            required
            className="select-entrada"
          >
            <option value="">Cortes</option>
            {Array.isArray(corte) ? (
              corte.map((c) => (
                <option key={c.id_corte} value={c.id_corte}>
                  {c.nombre_corte}
                </option>
              ))
            ) : (
              <option>Loading cortes...</option>
            )}
          </select>
          <select
            name="granjaId"
            placeholder="granjaId"
            onChange={handleChange}
            value={entryMovement.granjaId}
            style={{ color: "black" }}
            required
            className="select-entrada"
          >
            <option value="">Granja</option>
            {granja?.map((g) => (
              <option style={{ color: "black" }} key={g.id} value={g.id}>
                {g.Granja.nombre_granja}
              </option>
            ))}
          </select>
          <button className="button-enviar-entrada ">Enviar</button>
        </form>
      </div>
      {/* Table to display entry movements */}
      <div className="contenedor-1000">
        <table className="w-full border-collapse">
          {/* Table headers */}
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">Peso</th>
              <th className="py-2 px-4 border">Precio</th>
              <th className="py-2 px-4 border">Distribuidor</th>
              <th className="py-2 px-4 border">Corte</th>
              <th className="py-2 px-4 border">Granja</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {entryMovements.map((entry) => (
              <tr key={entry.id}>
                <td className="py-2 px-4 border">{entry.peso}</td>
                <td className="py-2 px-4 border">{entry.precio}</td>
                <td className="py-2 px-4 border">
                  {entry.distribuidor?.nombre_distribuidor}
                </td>
                <td className="py-2 px-4 border">
                  {entry.corte?.nombre_corte}
                </td>
                <td className="py-2 px-4 border">
                  {entry.granja?.Granja?.nombre_granja}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
