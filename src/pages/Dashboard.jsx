import { useContext } from 'react';
import {AuthContext} from '../context/AuthProvider';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import logo from '../assets/education.png';
import students from '../assets/students.png';
import registrations from '../assets/registrations.png';

const Dashboard = () => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };


    return (
        <div className='w-full min-h-screen bg-blue-700 flex flex-col justify-center items-center p-4'>
            <small className='font-sans text-white text-center block mt-10 text-3xl md:text-5xl'>Bienvenid@ {auth.nombre}</small>
            <div className='w-full flex flex-col md:flex-row justify-around items-center mt-10 space-y-6 md:space-y-0 md:space-x-6'>
                <Link to='/dashboard/materias'>
                    <div className='bg-white p-8 md:p-12 rounded-lg shadow-lg w-full max-w-xs md:max-w-lg hover:bg-blue-500 hover:text-white'>
                        <small className='text-black text-center block my-4 md:my-6 text-lg md:text-xl'>Materias</small>
                        <img src={logo} alt='subjects' className='w-16 h-16 md:w-24 md:h-24 mx-auto' />
                    </div>
                </Link>
                <Link to='/dashboard/estudiantes'>
                    <div className='bg-white p-8 md:p-12 rounded-lg shadow-lg w-full max-w-xs md:max-w-lg hover:bg-blue-500 hover:text-white'>
                        <small className='text-black text-center block my-4 md:my-6 text-lg md:text-xl'>Estudiantes</small>
                        <img src={students} alt='students' className='w-16 h-16 md:w-24 md:h-24 mx-auto' />
                    </div>
                </Link>
                <Link to='/dashboard/matriculas'>
                    <div className='bg-white p-8 md:p-12 rounded-lg shadow-lg w-full max-w-xs md:max-w-lg hover:bg-blue-500 hover:text-white'>
                        <small className='text-black text-center block my-4 md:my-6 text-lg md:text-xl'>Matrículas</small>
                        <img src={registrations} alt='enrollments' className='w-16 h-16 md:w-24 md:h-24 mx-auto' />
                    </div>
                </Link>
            </div>
            <button onClick={handleLogout} className='mt-10 mb-7 p-4 md:p-7 rounded-lg bg-red-500 text-white text-center block hover:bg-red-700'>
                Cerrar sesión
            </button>
        </div>
    );
};

export default Dashboard;