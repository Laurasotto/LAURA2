"use client";
import { useEffect, useState } from "react";
import useSubmitNewEntryMovement from "@/hooks/useSubmitNewEntryMovement";

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

  useEffect(() => {
    const fetchDistribuidor = async () => {
      const res = await getDistribuidor();
      setDistribuidor(res.data);
    };

    const fetchCorte = async () => {
      const res = await getCorte();
      setCorte(res.data);
    };

    const fetchGranja = async () => {
      const res = await getGranja();
      setGranja(res.data);
    };

    fetchDistribuidor();
    fetchCorte();
    fetchGranja();
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
          value={entryMovement.peso}
          required
        />
        <label style={{ color: "white" }}>Precio</label>
        <input
          type="number"
          name="precio"
          placeholder="precio"
          onChange={handleChange}
          value={entryMovement.precio}
          required
        />
        <select
          name="distribuidorId"
          placeholder="distribuidorId"
          onChange={handleChange}
          value={entryMovement.distribuidorId}
          required
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
        >
          <option value="">Cortes</option>
          {corte?.map((c) => (
            <option key={c.id_corte} value={c.id_corte}>
              {c.nombre_corte}
            </option>
          ))}
        </select>
        <select
          name="granjaId"
          placeholder="granjaId"
          onChange={handleChange}
          value={entryMovement.granjaId}
          style={{ color: "black" }}
          required
        >
          <option value="">Granja</option>
          {granja?.map((g) => (
            <option style={{ color: "black" }} key={g.id} value={g.id}>
              {g.Granja.nombre_granja}
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
