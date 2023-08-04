"use client";
import useSubmitDistributor from "@/hooks/useSubmitDistributor";

export default function DistributorPage() {
  const { handleDistributor, handleSubmit, distributor } =
    useSubmitDistributor();

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
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          justifyContent: "center",
          color: "#000",
        }}
      >
        <input
          type="text"
          name="nombre"
          placeholder="nombre"
          value={distributor.nombre || ""}
          onChange={handleDistributor}
          required
        />
        <input
          type="text"
          name="apellido"
          placeholder="apellido"
          value={distributor.apellido || ""}
          onChange={handleDistributor}
          required
        />
        <input
          type="number"
          name="telefono"
          placeholder="telefono"
          value={distributor.telefono || ""}
          onChange={handleDistributor}
          required
        />
        <input
          type="number"
          name="documento"
          placeholder="documento"
          value={distributor.documento || ""}
          onChange={handleDistributor}
          required
        />
        <button style={{ color: "#fff", border: "1px solid white" }}>
          Enviar
        </button>
      </form>
    </div>
  );
}
