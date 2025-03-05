import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import {Auth, NoAuth} from './layout/Auth';
import Dashboard from './pages/Dashboard';
import {AuthProvider} from './context/AuthProvider';
import RegistroEstudiante from './pages/Estudiantes/RegistroEstudiantes';
import DashboardEstudiantes from './layout/Estudiantes';
import { NotFound } from './pages/NotFound';
import InicioEstudiantes from './pages/Estudiantes/InicioEstudiantes';

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
                    </Route>
                    
                    <Route path="*" element={<NotFound/>} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;