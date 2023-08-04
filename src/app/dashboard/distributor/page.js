"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const CrearDistribuidorFormulario = () => {
  const [distribuidores, setDistribuidores] = useState({
    nombre_distribuidor: "",
    apellido_distribuidor: "",
    telefono_distribuidor: "",
    documento_distribuidor: "",
  });
  const [negocios, setNegocios] = useState([]);
  const [selectedNegocios, setSelectedNegocios] = useState([]);

  const getNegocios = async () => {
    try {
      const res = await axios.get("/api/auth/negocio");
      setNegocios(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Llamada a la API para obtener la lista de negocios
    getNegocios();
  }, []);

  const handleNegocioSelection = (event) => {
    const negocioId = parseInt(event.target.value);
    setSelectedNegocios((prevSelected) => {
      if (prevSelected.includes(negocioId)) {
        return prevSelected.filter((id) => id !== negocioId);
      } else {
        return [...prevSelected, negocioId];
      }
    });
  };

  const handleDistribuidorSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedNegocios);

    try {
      const res = await axios.post("/api/auth/distributor", {
        ...distribuidores,
        negocios: selectedNegocios,
      });

      setDistribuidores({
        nombre_distribuidor: "",
        apellido_distribuidor: "",
        telefono_distribuidor: "",
        documento_distribuidor: "",
      });

      setSelectedNegocios([]);

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleDistribuidorSubmit}>
        <div>
          <label>Nombre del distribuidor:</label>
          <input
            type="text"
            value={distribuidores.nombre_distribuidor || ""}
            onChange={(e) =>
              setDistribuidores({
                ...distribuidores,
                nombre_distribuidor: e.target.value,
              })
            }
            style={{ color: "black" }}
          />
        </div>
        <div>
          <label>Apellido del distribuidor:</label>
          <input
            type="text"
            value={distribuidores.apellido_distribuidor || ""}
            onChange={(e) =>
              setDistribuidores({
                ...distribuidores,
                apellido_distribuidor: e.target.value,
              })
            }
            style={{ color: "black" }}
          />
        </div>
        <div>
          <label>Teléfono del distribuidor:</label>
          <input
            type="text"
            value={distribuidores.telefono_distribuidor || ""}
            onChange={(e) =>
              setDistribuidores({
                ...distribuidores,
                telefono_distribuidor: e.target.value,
              })
            }
            style={{ color: "black" }}
          />
        </div>
        <div>
          <label>Documento del distribuidor:</label>
          <input
            type="text"
            value={distribuidores.documento_distribuidor || ""}
            onChange={(e) =>
              setDistribuidores({
                ...distribuidores,
                documento_distribuidor: e.target.value,
              })
            }
            style={{ color: "black" }}
          />
        </div>
        <div style={{ border: "1px solid white" }}>
          <label>Seleccionar negocios:</label>
          {negocios.map((negocio) => (
            <div key={negocio.id_negocio}>
              <input
                type="checkbox"
                value={negocio.id_negocio}
                checked={selectedNegocios.includes(negocio.id_negocio)}
                onChange={handleNegocioSelection}
              />
              <label>{negocio.nombre_negocio}</label>
            </div>
          ))}
        </div>
        <button type="submit">Guardar Distribuidor</button>
      </form>
    </div>
  );
};

export default CrearDistribuidorFormulario;
