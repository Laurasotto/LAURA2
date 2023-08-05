'use client';
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation"; // Corrige la importación aquí
import { useState } from "react";
import './login.css'

function LoginPage() {
  const [error, setError] = useState();
  const router = useRouter(); // Agrega esta línea para obtener el objeto router

  const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const res = await signIn('credentials', {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false,
        });

        if (res.error) return setError(res.error);

        if (res) {
            // El inicio de sesión fue exitoso
            router.push('/dashboard/profile'); // Redirige al usuario a la página /dashboard
        } else {
            // El inicio de sesión falló, maneja el error según sea necesario
            console.log('Inicio de sesión fallido');
        }
        console.log(res);
    } ;

    return (

      <div className='div-block-14'>
      <form onSubmit={handleSubmit} className='form'>
        {
          error && <div className="bd-red-500 text-white p-2 mb-2">{error}</div>
        }
        <h1 className='h1'>Iniciar Sesión</h1>
        
        <div className='form-block w-form'>
          <div className='contendor-form'>
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
        <div> 
    <button className="button-login">Ingresar</button></div>

      </form>
    </div>
  );
}

export default LoginPage;
