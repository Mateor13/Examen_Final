import axios from "axios";
import { useState, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Mensaje from "../../components/Alerts/Mensajes";

const RegistroEstudiante = () => {
    const [mensaje, setMensaje] = useState({});
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);

    const [form, setForm] = useState({
        nombre: '',
        apellido: '',
        cedula: '',
        fecha_nacimiento: '',
        ciudad: '',
        direccion: '',
        telefono: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/registrar/estudiantes`;
            const respuesta = await axios.post(url, form);
            localStorage.setItem('token', respuesta.data.token);
            console.log(localStorage.getItem('token'));
            setAuth(respuesta.data);
            toast.success("Registro exitoso");
            setForm({
                nombre: '',
                apellido: '',
                cedula: '',
                fecha_nacimiento: '',
                ciudad: '',
                direccion: '',
                telefono: '',
                email: '',
                password: ''
            });
        } catch (error) {
            /*Revisar :3*/
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Error al registrar estudiante");
            };
            setForm({});
            setTimeout(() => {
                setMensaje({});
            }, 5000);
        }
    };

    
    return (
        <>
            <ToastContainer />
            <div className="w-full h-screen bg-blue-700 bg-no-repeat bg-cover bg-center flex justify-center items-center">
                {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                    <small className="text-gray-700 text-center block my-4 text-sm">Registro del estudiante</small>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="mb-3">
                                <label className="mb-2 block text-sm font-semibold">Nombre</label>
                                <input type="text" placeholder="Ingresa tu nombre"
                                    name='nombre'
                                    value={form.nombre} onChange={handleChange}
                                    className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                            </div>
                            <div className="mb-3">
                                <label className="mb-2 block text-sm font-semibold">Apellido</label>
                                <input type="text" placeholder="Ingresa tu apellido"
                                    name='apellido'
                                    value={form.apellido} onChange={handleChange}
                                    className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                            </div>
                            <div className="mb-3">
                                <label className="mb-2 block text-sm font-semibold">Cédula</label>
                                <input type="number" placeholder="Ingresa tu cédula"
                                    name='cedula'
                                    value={form.cedula} onChange={handleChange}
                                    className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                            </div>
                            <div className="mb-3">
                                <label className="mb-2 block text-sm font-semibold">Fecha de Nacimiento</label>
                                <input type="date" placeholder="Ingresa tu fecha de nacimiento"
                                    name='fecha_nacimiento'
                                    value={form.fecha_nacimiento} onChange={handleChange}
                                    className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                            </div>
                            <div className="mb-3">
                                <label className="mb-2 block text-sm font-semibold">Ciudad</label>
                                <input type="text" placeholder="Ingresa tu ciudad"
                                    name='ciudad'
                                    value={form.ciudad} onChange={handleChange}
                                    className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                            </div>
                            <div className="mb-3">
                                <label className="mb-2 block text-sm font-semibold">Dirección</label>
                                <input type="text" placeholder="Ingresa tu dirección"
                                    name='direccion'
                                    value={form.direccion} onChange={handleChange}
                                    className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                            </div>
                            <div className="mb-3">
                                <label className="mb-2 block text-sm font-semibold">Teléfono</label>
                                <input type="text" placeholder="Ingresa tu teléfono"
                                    name='telefono'
                                    value={form.telefono} onChange={handleChange}
                                    className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                            </div>
                            <div className="mb-3">
                                <label className="mb-2 block text-sm font-semibold">Correo</label>
                                <input type="email" placeholder="Ingresa tu correo"
                                    name='email'
                                    value={form.email} onChange={handleChange}
                                    className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                            </div>
                        </div>
                        <div className="my-4">
                            <button type="submit" className="py-2 w-full block text-center bg-gray-700/100 text-slate-300 border rounded-xl hover:scale-100 duration-300 hover:bg-gray-900 hover:text-white">Registrar</button>
                        </div>
                    </form>
                    <button onClick={() => navigate('/dashboard')} className="py-2 w-full block text-center bg-gray-700/100 text-slate-300 border rounded-xl hover:scale-100 duration-300 hover:bg-gray-900 hover:text-white mt-4">Regresar al Dashboard</button>
                </div>
            </div>
        </>
    );
};

export default RegistroEstudiante;