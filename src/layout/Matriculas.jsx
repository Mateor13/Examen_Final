import { useContext, useState } from "react";
import { Link, Outlet, useLocation, Navigate } from 'react-router-dom';
import  {AuthContext}  from '../context/AuthProvider';
import { FaBars, FaTimes } from 'react-icons/fa';

const DashboardMatriculas = () => {
    const location = useLocation();
    const urlActual = location.pathname;
    const { auth } = useContext(AuthContext);
    const autenticado = localStorage.getItem('token');
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className='md:flex md:min-h-screen'>
            <div className='md:w-1/5 bg-gray-800 px-5 py-4 flex flex-col'>
                <div className='flex justify-between items-center md:hidden'>
                    <h2 className='text-4xl font-black text-center text-slate-200'>Módulo de Estudiantes</h2>
                    <button onClick={toggleMenu} className='text-white'>
                        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
                <div className={`md:block ${menuOpen ? 'block' : 'hidden'} flex flex-col h-full`}>
                    <p className='text-slate-400 text-center my-4 text-sm'> Usuario - {auth?.nombre}</p>
                    <hr className="mt-5 border-slate-500" />

                    <ul className="mt-5 flex-grow">
                        <li className="text-center">
                            <Link to='/dashboard' className={`${urlActual === '/dashboard' ? 'text-slate-200 bg-gray-900 px-3 py-2 rounded-md text-center' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Regresar a Inicio</Link>
                        </li>
                        <li className="text-center">
                            <Link to='/dashboard/matriculas/registrar' className={`${urlActual === '/dashboard/matriculas/registrar' ? 'text-slate-100 bg-gray-900 px-3 py-2 rounded-md text-center' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Registrar Matricula</Link>
                        </li>
                        <li className="text-center">
                            <Link to='/dashboard/matriculas/gestionar' className={`${urlActual === '/dashboard/matriculas/gestionar' ? 'text-slate-100 bg-gray-900 px-3 py-2 rounded-md text-center' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Gestionar Matriculas</Link>
                        </li>
                    </ul>
                    <div className="mt-auto">
                        <Link to='/' className="text-white mr-3 text-md block hover:bg-red-900 text-center bg-red-800 px-4 py-1 rounded-lg" onClick={() => { localStorage.removeItem('token') }}>Cerrar Sesión</Link>
                    </div>
                </div>
            </div>

            <div className='flex-1 flex flex-col justify-between h-screen bg-gray-100'>
                <div className='overflow-y-scroll'>
                    {autenticado ? <Outlet /> : <Navigate to="/login" />}
                </div>
            </div>
        </div>
    );
};

export default DashboardMatriculas;