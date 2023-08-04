"use client";
import useSubmitNewEntryMovement from "@/hooks/useSubmitNewEntryMovement";

export default function MovementPage() {
  const { entryMovement, handleChange, handleSubmit } =
    useSubmitNewEntryMovement();

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
          value={entryMovement.peso}
          required
        />
        <input
          type="number"
          name="precio"
          placeholder="precio"
          onChange={handleChange}
          value={entryMovement.precio}
          required
        />
        <select
          name="id_gd"
          placeholder="id_gd"
          onChange={handleChange}
          value={entryMovement.id_gd}
          required
        >
          <option value="">id_gd</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
        <select
          name="id_corte"
          placeholder="id_corte"
          onChange={handleChange}
          value={entryMovement.id_corte}
          required
        >
          <option value="">id_corte</option>
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
