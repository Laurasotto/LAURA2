'use client'
import { useState } from 'react';


const page = () => {
    const [formData, setFormData] = useState({
        
        id_distribuidor: '1',
        nombre_negocio: '',
        direccion_negocio: '',
        fecha_creacion: {
            type: Date,
            default: Date.now
        },
      
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('../api/auth/negocio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                // Handle successful registration, e.g., show a success message or redirect.
                window.location.href = '/dashboard/profile';
            } else {
                // Handle registration error, e.g., show an error message.
            }
        } catch (error) {
            console.error('Error during registration:', error);
            // Handle error during registration, e.g., show an error message.
        }
    };

    return (
        <>
            <h1 className='text-gray-800 font-open-sans inline-block'>Crear Negocio</h1>
            <form className='  ' onSubmit={handleSubmit}>
                
                <div>
                    <label>Nombre Negocio:</label>
                    <input type="text" name="nombre_negocio" onChange={handleChange} value={formData.nombre_negocio} />
                </div>
                <div>
                    <label>Direccion Negocio:</label>
                    <input type="text" name="direccion_negocio" onChange={handleChange} value={formData.direccion_negocio} />
                </div>
                
                

                <button type="submit">Crear negocio</button>
            </form>
        </>
    );
};

export default page;
