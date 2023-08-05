"use client";
import useExitMovement from "@/hooks/useExitMovement";
import { useEffect, useState } from "react";

export default function ExitMovement() {
  const { exitMovement, handleChange, handleSubmit, getEntryMovement } =
    useExitMovement();
  const [entryMovement, setEntryMovement] = useState([]);

  useEffect(() => {
    const fetchEntryMovement = async () => {
      const res = await getEntryMovement();
      setEntryMovement(res);
    };

    fetchEntryMovement();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        justifyContent: "center",
      }}
    >
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
        <label style={{ color: "white" }}>Peso</label>
        <input
          type="number"
          name="peso"
          placeholder="peso"
          onChange={handleChange}
          value={exitMovement.peso}
          required
        />
        <label style={{ color: "white" }}>Precio</label>
        <input
          type="number"
          name="precio"
          placeholder="precio"
          onChange={handleChange}
          value={exitMovement.precio}
          required
        />
        <select
          name="entryMovementId"
          placeholder="entryMovementId"
          onChange={handleChange}
          value={exitMovement.entryMovementId}
          required
        >
          <option value="">Movimiento entrada</option>
          {entryMovement?.map((entry) => (
            <option key={entry.id} value={entry.id}>
              {new Date(entry.fecha).toLocaleString("es-CO")}{" "}
              {entry.corte.nombre_corte}
            </option>
          ))}
        </select>
        <button style={{ color: "#fff", border: "1px solid white" }}>
          Enviar
        </button>
      </form>
    </div>
  );
}
