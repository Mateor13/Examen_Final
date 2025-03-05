import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import {Auth, NoAuth} from './layout/Auth';
import Dashboard from './pages/Dashboard';
import {AuthProvider} from './context/AuthProvider';
import RegistroEstudiante from './pages/Estudiantes/RegistroEstudiantes';
import DashboardEstudiantes from './layout/Estudiantes';
import { NotFound } from './pages/NotFound';
import InicioEstudiantes from './pages/Estudiantes/InicioEstudiantes';
import CrudEstudiantes from './pages/Estudiantes/CrudEstudiantes';
import ActualizarEstudiante from './pages/Estudiantes/ActualizarEstudiante';
import DashboardMaterias from './layout/Materias';
import InicioMaterias from './pages/Materias/InicioMaterias';
import RegistroMaterias from './pages/Materias/RegistroMaterias';
import DashboardMatriculas from './layout/Matriculas';
import InicioMatriculas from './pages/Matriculas/InicioMatriculas';
import RegistroMatriculas from './pages/Matriculas/RegistroMatriculas';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<NoAuth />}>
                        <Route index element={<Login />} />
                    </Route>
                    <Route path="/dashboard" element={<Auth />}>
                        <Route index element={<Dashboard />} />
                    </Route>
                    <Route path="/dashboard/estudiantes" element={<DashboardEstudiantes />}>
                        <Route index element={<InicioEstudiantes/>} />
                        <Route path="registrar" element={<RegistroEstudiante />} />
                        <Route path="gestionar" element={<CrudEstudiantes/>} />
                        <Route path="actualizar/:id" element={<ActualizarEstudiante/>} />
                    </Route>
                    <Route path="/dashboard/materias" element={<DashboardMaterias />}>
                        <Route index element={<InicioMaterias/>} />
                        <Route path="registrar" element={<RegistroMaterias />} />
                        <Route path="gestionar" element={<CrudEstudiantes/>} />
                        <Route path="actualizar/:id" element={<ActualizarEstudiante/>} />
                    </Route>

                    <Route path="/dashboard/matriculas" element={<DashboardMatriculas />}>
                        <Route index element={<InicioMatriculas/>} />
                        <Route path="registrar" element={<RegistroMatriculas />} />
                    </Route>
                
                    
                    <Route path="*" element={<NotFound/>} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;