
"use client"
import useSubmitDistributor from "@/hooks/useSubmitDistributor"

export default function DistributorPage() {
  const {handleDistributor, handleSubmit} = useSubmitDistributor()

  return (
    <div style={{display: "flex", width: "100%", height: "100vh", justifyContent: "center"}}>
      <form onSubmit={handleSubmit} onChange={handleDistributor} style={{display: "flex", flexDirection: "column", gap: "5px", justifyContent: "center", color: "#000"}} action="">
        <input type="text" name="nombre" placeholder="nombre" />
        <input type="text" name="apellido" placeholder="apellido" />
        <input type="number" name="telefono" placeholder="telefono" />
        <input type="number" name="documento" placeholder="documento" />
        <select name="negocio" placeholder="negocio">
          <option value="0">Negocio</option>
          <option value="1">Negocio1</option>
          <option value="2">Negocio2</option>
          <option value="3">Negocio3</option>
        </select>
        <button style={{color: "#fff"}}>Enviar</button>
      </form>
    </div>
  )
}
