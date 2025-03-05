import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Mensaje from "../../components/Alerts/Mensajes";

const RegistroMatriculas = () => {
    const [mensaje, setMensaje] = useState({});
    const navigate = useNavigate();

    const [form, setForm] = useState({
        id_estudiante: '',
        id_materia: '',
        descripcion: ''
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const validarFormulario = () => {
        if (!form.id_estudiante || !form.id_materia || !form.descripcion) {
            toast.error("Todos los campos son obligatorios");
            return false;
        }
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validarFormulario()) {
            setTimeout(() => {
                setMensaje({});
            }, 5000);
            return;
        }
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/registrar/matricula`;
            const respuesta = await axios.post(url, form, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(respuesta)
            toast.success(respuesta.data.message);
        } catch (error) {
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
                    <small className="text-gray-700 text-center block my-4 text-sm">Registro de la materia</small>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="mb-3">
                                <label className="mb-2 block text-sm font-semibold">Estudiante</label>
                                <input type="text" placeholder="Ingrese el identificador del estudiante"
                                    name='id_estudiante'
                                    value={form.id_estudiante} onChange={handleChange}
                                    className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                            </div>
                            <div className="mb-3">
                                <label className="mb-2 block text-sm font-semibold">Materia</label>
                                <input type="text" placeholder="Ingrese el identificador de la materia"
                                    name='id_materia'
                                    value={form.id_materia} onChange={handleChange}
                                    className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                            </div>
                            <div className="mb-3">
                                <label className="mb-2 block text-sm font-semibold">Descripción</label>
                                <input type="text" placeholder="Ingrese la descripción"
                                    name='descripcion'
                                    value={form.descripcion} onChange={handleChange}
                                    className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                            </div>
                            
                        </div>
                        <div className="my-4">
                            <button type="submit" className="py-2 w-full block text-center bg-gray-700/100 text-slate-300 border rounded-xl hover:scale-100 duration-300 hover:bg-gray-900 hover:text-white">Registrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RegistroMatriculas;