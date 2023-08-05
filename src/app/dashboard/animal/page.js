"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const CrearAnimalFormulario = () => {
  const [nombreAnimal, setNombreAnimal] = useState("");
  const [nombreRaza, setNombreRaza] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [animales, setAnimales] = useState([]);
  const [razas, setRazas] = useState([]);

  const getAnimales = async () => {
    const response = await axios.get("/api/auth/animal");
    setAnimales(response.data);
  };

  const getRazas = async () => {
    const response = await axios.get("/api/auth/raza");
    setRazas(response.data);
  };

  useEffect(() => {
    // Llamada a la API para obtener las animales y las razas
    getAnimales();
    getRazas();
  }, [animales, razas]);

  useEffect(() => {
    console.log(razas);
  }, [razas]);

  const handleAnimalSubmit = async (e) => {
    e.preventDefault();

    if (!nombreAnimal || nombreAnimal.trim().length === 0) {
      return setError("El nombre del animal no puede estar vacío");
    }

    try {
      const res = await axios.post("/api/auth/animal", {
        nombre_animal: nombreAnimal,
      });
      setNombreAnimal("");
      console.log(res);
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

      setRazas("");

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
    <div style={{ display: "flex", gap: "20px" }}>
      <form onSubmit={handleAnimalSubmit}>
        <div>
          <label>Nombre del animal:</label>
          <input
            type="text"
            onChange={(e) => setNombreAnimal(e.target.value)}
            style={{
              color: "black",
            }}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}
        <button type="submit">Guardar Animal</button>
      </form>

      <form onSubmit={handleRazaSubmit}>
        <div>
          <label>Nombre de la raza:</label>
          <input
            type="text"
            value={nombreRaza}
            onChange={(e) => setNombreRaza(e.target.value)}
            style={{
              color: "black",
            }}
          />
        </div>
        <div>
          <label>Animal:</label>
          <select
            value={nombreAnimal}
            onChange={(e) => setNombreAnimal(e.target.value)}
            style={{
              color: "black",
            }}
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
        <button type="submit">Guardar Raza</button>
      </form>
      <div>
        <h2>Animales</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            {animales?.map((animal) => (
              <tr key={animal.id_animal}>
                <td>{animal.id_animal}</td>
                <td>{animal.nombre_animal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2>Razas</h2>
        <table>
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
                  <td>{raza.id_raza}</td>
                  <td>{raza.nombre_raza}</td>
                  <td>{raza.Animal.nombre_animal}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CrearAnimalFormulario;
