import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Auth from './layout/Auth';
import Dashboard from './pages/Dashboard';
import {AuthProvider} from './context/AuthProvider';
function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={<Auth />}>
                        <Route index element={<Dashboard />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;