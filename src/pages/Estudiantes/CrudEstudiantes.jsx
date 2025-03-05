import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CrudEstudiantes = () => {
    const [estudiantes, setEstudiantes] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const listaEstudiantes = async () => {
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/listado/estudiantes`;
                const respuesta = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setEstudiantes(respuesta.data);
            } catch (error) {
                toast.error("Error al cargar los estudiantes");
            }
        };
        listaEstudiantes();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/buscar/estudiantes/${search}`;
            const respuesta = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setEstudiantes([respuesta.data]);
        } catch (error) {
            toast.error("Error al buscar el estudiante");
        }
    };

    const handleDelete = async (id) => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/eliminar/estudiantes/${id}`;
            await axios.delete(url, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setEstudiantes(estudiantes.filter(estudiante => estudiante._id !== id));
            toast.success("Estudiante eliminado correctamente");
        } catch (error) {
            toast.error("Error al eliminar el estudiante");
        }
    };

    const handleEdit = (id) => {
        navigate(`/dashboard/estudiante/actualizar/${id}`);
    };

    const handleAdd = () => {
        navigate('/dashboard/estudiante/registrar');
    };

    return (
        <div className="w-full h-screen bg-blue-700 bg-no-repeat bg-cover bg-center flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
                <h1 className="text-2xl font-bold mb-4 text-center">Listado de Estudiantes</h1>
                <div className="mb-4 flex justify-between">
                    <form onSubmit={handleSearch} className="flex">
                        <input
                            type="text"
                            placeholder="Buscar por cédula"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="block w-full rounded-md border border-gray-300 py-1 px-2"
                        />
                        <button type="submit" className="ml-2 py-1 px-4 bg-blue-500 text-white rounded-md">Buscar</button>
                    </form>
                    <button onClick={handleAdd} className="py-1 px-4 bg-green-500 text-white rounded-md">Agregar Estudiante</button>
                </div>
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2">Nombre</th>
                            <th className="py-2">Apellido</th>
                            <th className="py-2">Cédula</th>
                            <th className="py-2">Fecha de Nacimiento</th>
                            <th className="py-2">Ciudad</th>
                            <th className="py-2">Dirección</th>
                            <th className="py-2">Teléfono</th>
                            <th className="py-2">Correo</th>
                            <th className="py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(estudiantes) && estudiantes.length > 0 ? (
                            estudiantes.map(estudiante => (
                                <tr key={estudiante._id}>
                                    <td className="border px-4 py-2">{estudiante.nombre}</td>
                                    <td className="border px-4 py-2">{estudiante.apellido}</td>
                                    <td className="border px-4 py-2">{estudiante.cedula}</td>
                                    <td className="border px-4 py-2">{estudiante.fecha_nacimiento}</td>
                                    <td className="border px-4 py-2">{estudiante.ciudad}</td>
                                    <td className="border px-4 py-2">{estudiante.direccion}</td>
                                    <td className="border px-4 py-2">{estudiante.telefono}</td>
                                    <td className="border px-4 py-2">{estudiante.email}</td>
                                    <td className="border px-4 py-2 flex justify-around">
                                        <button onClick={() => handleEdit(estudiante._id)} className="text-blue-500">
                                            <FaEdit />
                                        </button>
                                        <button onClick={() => handleDelete(estudiante._id)} className="text-red-500">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center py-4">No se encontraron estudiantes</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CrudEstudiantes;