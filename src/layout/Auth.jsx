import { Outlet, Navigate } from 'react-router-dom';

const Auth = () => {
    const autenticado = localStorage.getItem('token');
    return (
        <main className='flex justify-center content-center w-full h-screen'>
            {autenticado ? <Outlet /> : <Navigate to='/' />}
        </main>
    );
};

const NoAuth = () => {
    const autenticado = localStorage.getItem('token');
    return (
        <main className='flex justify-center content-center w-full h-screen'>
            {autenticado ? <Navigate to='/dashboard'/> : <Outlet/>}
        </main>
    );
};


export  {
    Auth,
    NoAuth
};