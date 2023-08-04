'use client'
import React, { useState, useEffect } from 'react';

const CrearAnimalFormulario = () => {
  const [nombreAnimal, setNombreAnimal] = useState('');
  const [nombreRaza, setNombreRaza] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [animales, setAnimales] = useState([]);
  const [razas, setRazas] = useState([]);

  useEffect(() => {
    // Llamada a la API para obtener las animales y las razas
    Promise.all([
      fetch('/api/auth/animal').then((response) => response.json()),
      fetch('/api/auth/raza').then((response) => response.json())
    ])
      .then(([animalesData, razasData]) => {
        setAnimales(animalesData);
        setRazas(razasData);
      })
      .catch((error) => console.error('Error al obtener los datos', error));
  }, []);

  const handleAnimalSubmit = async (e) => {
    e.preventDefault();

    if (!nombreAnimal || nombreAnimal.trim().length === 0) {
      setError('El nombre del animal no puede estar vacío');
      setMensaje('');
      return;
    }

    try {
      const response = await fetch('/api/auth/animal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre_animal: nombreAnimal }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || 'Hubo un error al guardar el animal.');
        setMensaje('');
      } else {
        const data = await response.json();
        setError('');
        setMensaje('Animal registrado exitosamente: ' + data.nombre_animal);
        setNombreAnimal('');
      }
    } catch (error) {
      setError('Hubo un error al comunicarse con el servidor.');
      setMensaje('');
    }
  };

  const handleRazaSubmit = async (e) => {
    e.preventDefault();

    if (!nombreRaza || nombreRaza.trim().length === 0) {
      setError('El nombre de la raza no puede estar vacío');
      setMensaje('');
      return;
    }

    try {
      const response = await fetch('/api/auth/raza', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre_raza: nombreRaza }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || 'Hubo un error al guardar la raza.');
        setMensaje('');
      } else {
        const data = await response.json();
        setError('');
        setMensaje('Raza registrada exitosamente: ' + data.nombre_raza);
        setNombreRaza('');
      }
    } catch (error) {
      setError('Hubo un error al comunicarse con el servidor.');
      setMensaje('');
    }
  };

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
    <form onSubmit={handleAnimalSubmit}>
      <div>
        <label>Nombre del animal:</label>
        <input type="text" value={nombreAnimal} onChange={(e) => setNombreAnimal(e.target.value)} />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
      <button type="submit">Guardar Animal</button>
    </form>

    <form onSubmit={handleRazaSubmit}>
      <div>
        <label>Nombre de la raza:</label>
        <input type="text" value={nombreRaza} onChange={(e) => setNombreRaza(e.target.value)} />
      </div>
      <div>
        <label>Animal:</label>
        <select value={nombreAnimal} onChange={(e) => setNombreAnimal(e.target.value)}>
          <option value="">Selecciona un animal</option>
          {animales.map((animal) => (
            <option key={animal.id_animal} value={animal.nombre_animal}>
              {animal.nombre_animal}
            </option>
          ))}
        </select>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
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
            {animales.map((animal) => (
              <tr key={animales.id_animal}>
                <td>{animales.id_animal}</td>
                <td>{animales.nombre_animal}</td>
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
            </tr>
          </thead>
          <tbody>
            {razas.map((raza) => (
              <tr key={razas.id_raza}>
                <td>{razas.id_raza}</td>
                <td>{razas.nombre_raza}</td>
                <td>{razas.nombre_animal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CrearAnimalFormulario;
