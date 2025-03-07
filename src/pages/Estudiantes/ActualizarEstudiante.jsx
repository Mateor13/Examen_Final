import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Mensaje from "../../components/Alerts/Mensajes.jsx";

const ActualizarEstudiante = () => {
    const { id } = useParams();
    const [mensaje, setMensaje] = useState({});
    const [form, setForm] = useState({
        ciudad: '',
        direccion: '',
        telefono: '',
        email: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEstudiante = async () => {
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/buscar/estudiantes/${id}`;
                const respuesta = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setForm({
                    ciudad: respuesta.data.estudiante.ciudad,
                    direccion: respuesta.data.estudiante.direccion,
                    telefono: respuesta.data.estudiante.telefono,
                    email: respuesta.data.estudiante.email,
                    _id: respuesta.data.estudiante._id
                });
            } catch (error) {
                toast.error("Error al cargar el estudiante");
            }
        };
        fetchEstudiante();
    }, [id]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/actualizar/estudiantes/${form._id}`;
            delete form._id;
            await axios.patch(url, form, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            toast.success("Estudiante actualizado correctamente");
            navigate('/dashboard/estudiantes/gestionar');
        } catch (error) {
            toast.error("Error al actualizar el estudiante");
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="w-full h-screen bg-blue-700 bg-no-repeat bg-cover bg-center flex justify-center items-center">
                {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-4 text-center">Actualizar Estudiante</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Ciudad</label>
                            <input type="text" placeholder="Ingresa la ciudad"
                                name='ciudad'
                                value={form.ciudad || ""} onChange={handleChange}
                                className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                        </div>
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Dirección</label>
                            <input type="text" placeholder="Ingresa la dirección"
                                name='direccion'
                                value={form.direccion || ""} onChange={handleChange}
                                className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                        </div>
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Teléfono</label>
                            <input type="text" placeholder="Ingresa el teléfono"
                                name='telefono'
                                value={form.telefono || ""} onChange={handleChange}
                                className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                        </div>
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Correo</label>
                            <input type="email" placeholder="Ingresa el correo"
                                name='email'
                                value={form.email || ""} onChange={handleChange}
                                className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                        </div>
                        <div className="my-4">
                            <button className="py-2 w-full block text-center bg-gray-700/100 text-slate-300 border rounded-xl hover:scale-100 duration-300 hover:bg-gray-900 hover:text-white">Actualizar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ActualizarEstudiante;