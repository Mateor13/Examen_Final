import {useContext} from 'react'
import AuthContext from '../context/AuthProvider'
import {Link, Navigate, Outlet, useLocation} from 'react-router-dom'
import logo from '../assets/education.png'
import students from '../assets/students.png'
import registrations from '../assets/registrations.png'

const Dashboard = () => {

    const {auth} = useContext(AuthContext)
    console.log(auth)
    
    return (
        <div className='w-full h-screen bg-blue-700 flex flex-col justify-center items-center'>
            <small className='font-sans text-white text-center block mt-10 text-5xl'>Bienvenid@ {auth.nombre}</small>
            <div className='w-full h-full flex flex-col md:flex-row justify-around items-center mt-10'>
                <Link to=''>
                    <div className='bg-white p-12 rounded-lg shadow-lg w-full max-w-lg mb-6 md:mb-0 hover:bg-blue-500 hover:text-white'>
                        <small className='text-black text-center block my-6 text-xl'>Materias</small>
                        <img src={logo} alt='subjects' className='w-24 h-24 mx-auto' />
                        <Outlet />
                    </div>
                </Link>
                <Link to=''>
                    <div className='bg-white p-12 rounded-lg shadow-lg w-full max-w-lg mb-6 md:mb-0 hover:bg-blue-500 hover:text-white'>
                        <small className='text-black text-center block my-6 text-xl'>Estudiantes</small>
                        <img src={students} alt='students' className='w-24 h-24 mx-auto' />
                        <Outlet />
                    </div>
                </Link>
                <Link to=''>
                    <div className='bg-white p-12 rounded-lg shadow-lg w-full max-w-lg hover:bg-blue-500 hover:text-white'>
                        <small className='text-black text-center block my-6 text-xl'>Matrículas</small>
                        <img src={registrations} alt='enrollments' className='w-24 h-24 mx-auto' />
                        <Outlet />
                    </div>
                </Link>
            </div>
            <Link to='/' onClick={localStorage.removeItem('token')} className='mb-7 p-7 rounded-lg bg-red-500 text-white text-center block mt-10 hover:bg-red-700'>Cerrar sesión</Link>
        </div>
    );
}
export default Dashboard
