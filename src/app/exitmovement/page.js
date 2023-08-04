"use client";
import useExitMovement from "@/hooks/useExitMovement";

export default function ExitMovement() {
  const { exitMovement, handleChange, handleSubmit } = useExitMovement();

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
        <input
          type="number"
          name="peso"
          placeholder="peso"
          onChange={handleChange}
          value={exitMovement.peso}
          required
        />
        <input
          type="number"
          name="precio"
          placeholder="precio"
          onChange={handleChange}
          value={exitMovement.precio}
          required
        />
        <select
          name="movimientoEntradaId"
          placeholder="movimientoEntradaId"
          onChange={handleChange}
          value={exitMovement.movimientoEntradaId}
          required
        >
          <option value="">id_gd</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
        <button style={{ color: "#fff", border: "1px solid white" }}>
          Enviar
        </button>
      </form>
    </div>
  );
}
