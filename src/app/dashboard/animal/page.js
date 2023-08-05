"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import "./animal.css";

const CrearAnimalFormulario = () => {
  const [nombreAnimal, setNombreAnimal] = useState("");
  const [nombreRaza, setNombreRaza] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [animales, setAnimales] = useState([]);
  const [razas, setRazas] = useState([]);

  const getAnimales = async () => {
    try {
      const response = await axios.get("/api/auth/animal");
      setAnimales(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getRazas = async () => {
    try {
      const response = await axios.get("/api/auth/raza");
      setRazas(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Llamada a la API para obtener las animales y las razas
    getAnimales();
    getRazas();
  }, []);

  const handleAnimalSubmit = async (e) => {
    e.preventDefault();

    if (!nombreAnimal || nombreAnimal.trim().length === 0) {
      return setError("El nombre del animal no puede estar vacío");
    }

    try {
      const res = await axios.post("/api/auth/animal", {
        nombre_animal: nombreAnimal,
      });
      getAnimales();
      setNombreAnimal("");
      return setMensaje("Animal registrado exitosamente: " + res.data);
    } catch (error) {
      setMensaje("");
      return setError("Hubo un error al comunicarse con el servidor.");
    }
  };

  const handleRazaSubmit = async (e) => {
    e.preventDefault();

    if (!nombreRaza || nombreRaza.trim().length === 0) {
      setMensaje("");
      return setError("El nombre de la raza no puede estar vacío");
    }

    try {
      const response = await axios.post("/api/auth/raza", {
        nombre_raza: nombreRaza,
        id_animal: nombreAnimal,
      });

      getRazas();
      setNombreRaza("");
      setNombreAnimal("");

      return setMensaje(
        "Raza registrada exitosamente: " + response.data.nombre_raza
      );
    } catch (error) {
      console.log(error);
      setMensaje("");
      return setError("Hubo un error al comunicarse con el servidor.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div className="section-animal">
        {/* Formulario para crear animales */}
        <form onSubmit={handleAnimalSubmit} className="form-animal">
          <h2 className="h1-animal">Crear Animal</h2>
          <div>
            <label>Nombre del animal:</label>
            <input
              type="text"
              onChange={(e) => setNombreAnimal(e.target.value)}
              className="input w-input"
              value={nombreAnimal}
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}
          <button
            type="submit"
            style={{
              background: "blue",
              color: "white",
              padding: "8px 15px",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Guardar Animal
          </button>
        </form>

        {/* Formulario para crear razas */}
        <form onSubmit={handleRazaSubmit} className="form-raza">
          <h2 className="h1-animal">Crear Raza</h2>
          <div>
            <label>Nombre de la raza:</label>
            <input
              type="text"
              value={nombreRaza}
              onChange={(e) => setNombreRaza(e.target.value)}
              className="input w-input"
            />
          </div>
          <div className="cont100%">
            <label>Animal:</label>
            <select
              value={nombreAnimal}
              onChange={(e) => setNombreAnimal(e.target.value)}
              className="input w-input"
            >
              <option value="">Selecciona un animal</option>
              {animales.map((animal) => (
                <option key={animal.id_animal} value={animal.id_animal}>
                  {animal.nombre_animal}
                </option>
              ))}
            </select>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}
          <button
            type="submit"
            style={{
              background: "blue",
              color: "white",
              padding: "8px 15px",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Guardar Raza
          </button>
        </form>
      </div>
      <div className="flex-animal">
        {/* Tabla de Animales */}
        <div style={{ marginBottom: "20px", maxWidth: "400px" }}>
          <h2>Animales</h2>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              border: "1px solid #ccc",
            }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {animales?.map((animal) => (
                <tr key={animal.id_animal}>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    {animal.id_animal}
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    {animal.nombre_animal}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tabla de Razas */}
        <div style={{ maxWidth: "400px" }}>
          <h2>Razas</h2>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              border: "1px solid #ccc",
            }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Animal</th>
              </tr>
            </thead>
            <tbody>
              {razas &&
                razas?.map((raza) => (
                  <tr key={raza.id_raza}>
                    <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                      {raza.id_raza}
                    </td>
                    <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                      {raza.nombre_raza}
                    </td>
                    <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                      {raza.Animal.nombre_animal}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CrearAnimalFormulario;
