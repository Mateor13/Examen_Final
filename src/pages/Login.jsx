import axios from "axios";
import { useState, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify'
import Mensaje from "../components/Alerts/Mensajes";
const Login = () => {
    const [mensaje, setMensaje] = useState({})
    const navigate = useNavigate()
    const {setAuth} = useContext(AuthContext)

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(form.email)) {
            toast.error("Por favor, ingresa un correo electrónico válido.");
            return;
        }
        try{
            const url =`${import.meta.env.VITE_BACKEND_URL}/login`;
            const respuesta = await axios.post(url, form);
            localStorage.setItem('token', respuesta.data.token);
            setAuth(respuesta.data);
            navigate('/dashboard')
        } catch(error){
            toast.error(error?.response.data.message)
            setForm({})
            setTimeout(()=>{
                setMensaje({});
            }, 5000);
        }
    }
    return (
        <>
            <ToastContainer />
            <div className="w-full h-screen bg-blue-700 bg-no-repeat bg-cover bg-center flex justify-center items-center">
                {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <img src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png" alt="login" className="w-20 h-20 mx-auto" />
                    <small className="text-gray-700 text-center block my-4 text-sm">¡Bienvenido!</small>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Correo</label>
                            <input type="email" placeholder="Ingresa tu correo"
                                name='email'
                                value={form.email || ""} onChange={handleChange}
                                className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                        </div>
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Contraseña</label>
                            <input type="password" placeholder="********************"
                                name='password'
                                value={form.password || ""} onChange={handleChange}
                                className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                        </div>
                        <div className="my-4">
                            <button className="py-2 w-full block text-center bg-gray-700/100 text-slate-300 border rounded-xl hover:scale-100 duration-300 hover:bg-gray-900 hover:text-white">Ingresar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login