'use client';
import axios, { AxiosError } from "axios";
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation"; // Corrige la importación aquí
import { useState } from "react";
import './register.css'

function RegisterPage() {
  const [error, setError] = useState();
  const router = useRouter(); // Agrega esta línea para obtener el objeto router

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const signupResponse = await axios.post('/api/auth/signup', {
        nombre: formData.get("nombre"),
        apellido: formData.get("apellido"),
        telefono: formData.get("telefono"),
        documento: formData.get("documento"),
        email: formData.get("email"),
        password: formData.get("password"),
        roleId: formData.get("roleId"),

      });
      console.log(signupResponse);
      const res = await signIn('credentials', {
        email: signupResponse.data.email,
        password: formData.get("password"),
        redirect: false,
      });

      if (res) {
        // El inicio de sesión fue exitoso
        router.push('/login'); // Redirige al usuario a la página /dashboard
      } else {
        // El inicio de sesión falló, maneja el error según sea necesario
        console.log('Inicio de sesión fallido');
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className='div-block-14'>
      <form onSubmit={handleSubmit} className='form'>
        {
          error && <div className="bd-red-500 text-white p-2 mb-2">{error}</div>
        }
         <h1 className='h1'>Registro</h1>
        <div className='form-block w-form'>
          <div className='contendor-form'>
          <input type="text"
          placeholder="Nombre"
          name="nombre"
          className="input w-input"
        />

        <input type="text"
          placeholder="Apellido"
          name="apellido"
          className="input w-input"
        />

        <input type="text"
          placeholder="Telefono"
          name="telefono"
          className="input w-input"
        />

        <input type="text"
          placeholder="Documento"
          name="documento"
          className="input w-input"
        />

        <input type="email"
          placeholder="email@email.com"
          name="email"
          className="input w-input"
        />

        <input type="password"
          placeholder="******"
          name="password"
          className="input w-input"
        />

        </div>
       </div>

        <select name="roleId" className="select">
          <option value="1">Admin</option>
          <option value="2">Empleado</option>
        </select>
        <div className="divbotones">
        <button className="button-register">Registrarse</button>
        </div>

      </form>
    </div>
  );
}

export default RegisterPage;