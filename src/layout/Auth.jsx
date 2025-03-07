import { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import axios from 'axios';

const Auth = () => {
    const [autenticado, setAutenticado] = useState(null);

    useEffect(() => {
        const verificarAutenticacion = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setAutenticado(false);
                return;
            }

            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/visualizar/perfil`;
                await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setAutenticado(true);
            } catch (error) {
                setAutenticado(false);
                localStorage.removeItem('token');
            }
        };

        verificarAutenticacion();
    }, []);

    if (autenticado === null) {
        return <div>Cargando...</div>; // Puedes mostrar un spinner o mensaje de carga aquí
    }

    return (
        <main className='flex justify-center items-center w-full h-screen'>
            {autenticado ? <Outlet /> : <Navigate to='/login' />}
        </main>
    );
};

const NoAuth = () => {
    const autenticado = localStorage.getItem('token');
    return (
        <main className='flex justify-center items-center w-full h-screen'>
            {autenticado ? <Navigate to='/dashboard' /> : <Outlet />}
        </main>
    );
};

export {
    Auth,
    NoAuth
};