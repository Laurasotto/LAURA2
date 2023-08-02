'use client'
import { useState, useEffect } from 'react';
import axios from 'axios'; // Importa axios si aún no lo has hecho

function FormularioNegocio() {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [distribuidores, setDistribuidores] = useState([]);
  const [selectedDistribuidor, setSelectedDistribuidor] = useState('');

  // Obtén los datos reales de los distribuidores desde tu backend
  useEffect(() => {
    const fetchDistribuidores = async () => {
      try {
        const response = await axios.get('/api/distribuidores'); // Asegúrate de ajustar la URL a tu endpoint real
        setDistribuidores(response.data);
      } catch (error) {
        console.error('Error al obtener los distribuidores:', error);
      }
    };

    fetchDistribuidores();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envía los datos del formulario al backend
      const response = await axios.post('/api/negocios', {
        nombre,
        direccion,
        id_distribuidor: selectedDistribuidor,
      });
      console.log('Negocio guardado:', response.data);
      // Haz aquí algo con la respuesta, por ejemplo, mostrar un mensaje de éxito o redirigir a otra página
    } catch (error) {
      console.error('Error al guardar el negocio:', error);
      // Haz aquí algo para manejar el error, por ejemplo, mostrar un mensaje de error al usuario
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="direccion">Dirección:</label>
        <input
          type="text"
          id="direccion"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="distribuidor">Distribuidor:</label>
        <select
          id="distribuidor"
          value={selectedDistribuidor}
          onChange={(e) => setSelectedDistribuidor(e.target.value)}
        >
          <option value="">Seleccione un distribuidor</option>
          {distribuidores.map((distribuidor) => (
            <option key={distribuidor.id_distribuidor} value={distribuidor.id_distribuidor}>
              {distribuidor.nombre}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
}

export default FormularioNegocio;
