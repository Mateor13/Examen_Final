import { useContext, useState, useMemo } from "react";
import { Link, Outlet, useLocation, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { FaBars, FaTimes } from "react-icons/fa";
import { TiArrowBack } from "react-icons/ti";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdManageAccounts } from "react-icons/md";

const DashboardEstudiantes = () => {
    const location = useLocation();
    const urlActual = useMemo(() => location.pathname, [location]);
    const { auth } = useContext(AuthContext);
    const autenticado = localStorage.getItem("token");
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    return (
        <div className="md:flex md:min-h-screen">
            {/* Sidebar */}
            <aside className="md:w-1/5 bg-gray-800 px-5 py-4 flex flex-col">
                {/* Header móvil */}
                <div className="flex justify-between items-center md:hidden">
                    <h2 className="text-3xl font-bold text-slate-200">Módulo de Estudiantes</h2>
                    <button onClick={toggleMenu} className="text-white" aria-label="Toggle menu">
                        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>

                {/* Menú de navegación */}
                <nav className={`md:block ${menuOpen ? "block" : "hidden"} flex flex-col h-full`}>
                    <p className="text-slate-400 text-center my-4 text-sm">Usuario - {auth?.nombre}</p>
                    <hr className="border-slate-500" />

                    <ul className="mt-5 flex-grow">
                        {[
                            { path: "/dashboard", label: "Regresar a Inicio", icon: <TiArrowBack /> },
                            { path: "/dashboard/estudiantes/registrar", label: "Crear Estudiante", icon: <IoIosAddCircleOutline /> },
                            { path: "/dashboard/estudiantes/gestionar", label: "Gestionar Estudiante", icon: <MdManageAccounts /> },
                        ].map(({ path, label, icon }) => (
                            <li key={path} className="text-center">
                                <Link
                                    to={path}
                                    className={`block text-xl px-3 py-2 rounded-md ${
                                        urlActual === path
                                            ? "text-slate-200 bg-gray-900"
                                            : "text-slate-400 hover:text-slate-200"
                                    }`}
                                    onClick={closeMenu}
                                >
                                    <span className="inline-block mr-2">{icon}</span>
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Botón de cierre de sesión */}
                    <div className="mt-auto">
                        <Link
                            to="/"
                            className="block text-md text-center bg-red-800 px-4 py-2 rounded-lg text-white hover:bg-red-900"
                            onClick={() => {
                                localStorage.removeItem("token");
                                closeMenu();
                            }}
                        >
                            Cerrar Sesión
                        </Link>
                    </div>
                </nav>
            </aside>

            {/* Contenido Principal */}
            <main className="flex-1 flex flex-col justify-between h-screen bg-gray-100">
                <div className="overflow-y-auto">
                    {autenticado ? <Outlet /> : <Navigate to="/login" />}
                </div>
            </main>
        </div>
    );
};

export default DashboardEstudiantes;