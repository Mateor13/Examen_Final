import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CrudMaterias = () => {
    const [materias, setMaterias] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const listaMaterias = async () => {
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/listado/materias`;
                const respuesta = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setMaterias(respuesta.data.todas_materias);
            } catch (error) {
                console.log(error)
                toast.error(error?.response.data.message || "Error al cargar las materias");
            }
        };
        listaMaterias();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/buscar/materias/${search}`;
            const respuesta = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(respuesta.data);
            setMaterias([respuesta.data.materia]);
        } catch (error) {
            console.log(error)
            
        }
    };

    const handleDelete = async (id) => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/eliminar/materias/${id}`;
            await axios.delete(url, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setMaterias(prevEstudiantes => prevEstudiantes.filter(estudiante => estudiante._id !== id));
            toast.success("materia eliminada correctamente");
        } catch (error) {
            toast.error(error?.response.data.message || "Error al eliminar la materia");
        }
    };

    const handleEdit = (id) => {
        navigate(`/dashboard/materias/actualizar/${id}`);
    };

    const handleAdd = () => {
        navigate('/dashboard/materias/registrar');
    };

    return (
        <div className="w-full h-screen bg-blue-700 bg-no-repeat bg-cover bg-center flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl overflow-x-auto">
                <h1 className="text-2xl font-bold mb-4 text-center">Listado de Materias</h1>
                <div className="mb-4 flex justify-between">
                    <form onSubmit={handleSearch} className="flex w-full max-w-md">
                        <input
                            type="text"
                            placeholder="Buscar por nombre"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="block w-full rounded-md border border-gray-300 py-1 px-2"
                        />
                        <button type="submit" className="ml-2 py-1 px-4 bg-blue-500 text-white rounded-md">Buscar</button>
                    </form>
                    <button onClick={handleAdd} className="py-1 px-4 bg-green-500 text-white rounded-md">Agregar Materia</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2">Acciones</th>
                                <th className="py-2">Código</th>
                                <th className="py-2">Nombre</th>
                                <th className="py-2">Descripción</th>
                                <th className="py-2">Créditos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(materias) && materias.length > 0 ? (
                                materias.map(materia => (
                                    <tr key={materia._id}>
                                        <td className="border px-4 py-2 flex justify-around">
                                            <button onClick={() => handleEdit(materia.nombre)} className="text-blue-500">
                                                <FaEdit />
                                            </button>
                                            <button onClick={() => handleDelete(materia._id)} className="text-red-500">
                                                <FaTrash />
                                            </button>
                                        </td>
                                        <td className="border px-4 py-2">{materia.codigo}</td>
                                        <td className="border px-4 py-2">{materia.nombre}</td>
                                        <td className="border px-4 py-2">{materia.descripcion}</td>
                                        <td className="border px-4 py-2">{materia.creditos}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="text-center py-4">No se encontraron materias</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CrudMaterias;