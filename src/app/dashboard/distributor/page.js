'use client'
import React, { useState, useEffect } from 'react';

const CrearDistribuidorFormulario = () => {
  const [nombreDistribuidor, setNombreDistribuidor] = useState('');
  const [apellidoDistribuidor, setApellidoDistribuidor] = useState('');
  const [telefDistribuidor, setTelefDistribuidor] = useState('');
  const [documentoDistribuidor, setDocumentoDistribuidor] = useState('');
  const [negocios, setNegocios] = useState([]);
  const [selectedNegocios, setSelectedNegocios] = useState([]);

  useEffect(() => {
    // Llamada a la API para obtener la lista de negocios
    fetch('/api/negocios')
      .then((response) => response.json())
      .then((data) => {
        setNegocios(data);
      })
      .catch((error) => console.error('Error al obtener los negocios', error));
  }, []);

  const handleDistribuidorSubmit = async (e) => {
    e.preventDefault();

    // Validaciones de campos aquí...

    // Formatear la lista de negocios seleccionados en un arreglo de IDs
    const negociosSeleccionados = selectedNegocios.map((negocio) => negocio.id_negocio);

    try {
      const response = await fetch('/api/auth/distribuidor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre_distribuidor: nombreDistribuidor,
          apellido_distribuidor: apellidoDistribuidor,
          telefono_distribuidor: telefDistribuidor,
          documento_distribuidor: documentoDistribuidor,
          negocios: negociosSeleccionados,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        // Mostrar mensajes de error
      } else {
        const data = await response.json();
        // Mostrar mensaje de éxito
      }
    } catch (error) {
      // Mostrar mensaje de error al comunicarse con el servidor
    }
  };

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

  return (
    <div>
      <form onSubmit={handleDistribuidorSubmit}>
        <div>
          <label>Nombre del distribuidor:</label>
          <input
            type="text"
            value={nombreDistribuidor}
            onChange={(e) => setNombreDistribuidor(e.target.value)}
          />
        </div>
        <div>
          <label>Apellido del distribuidor:</label>
          <input
            type="text"
            value={apellidoDistribuidor}
            onChange={(e) => setApellidoDistribuidor(e.target.value)}
          />
        </div>
        <div>
          <label>Teléfono del distribuidor:</label>
          <input
            type="text"
            value={telefDistribuidor}
            onChange={(e) => setTelefDistribuidor(e.target.value)}
          />
        </div>
        <div>
          <label>Documento del distribuidor:</label>
          <input
            type="text"
            value={documentoDistribuidor}
            onChange={(e) => setDocumentoDistribuidor(e.target.value)}
          />
        </div>
        <div>
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