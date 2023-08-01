'use client';
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation"; // Corrige la importación aquí
import { useState } from "react";

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

    <div className='justify-center h-[calc(100vh-4rem)] flex items-center'>
      <form onSubmit={handleSubmit} className='bg-neutral-950 px-8 py-10 w-3/12'>
        {
          error && <div className="bd-red-500 text-white p-2 mb-2">{error}</div>
        }
        <h1 className='bg-white text-4xl font-bold mb-7'>Signin</h1>
        

        <input type="email"
          placeholder="email@email.com"
          name="email"
          className="bg-zinc-800  px-4 py-2 block mb-2 w-full"
        />


        <input type="password"
          placeholder="******"
          name="password"
          className="bg-zinc-800  px-4 py-2 block mb-2 w-full"
        />

        <button className="bg-indigo-500 px-4 py-2">Login</button>

      </form>
    </div>
  );
}

export default LoginPage;
