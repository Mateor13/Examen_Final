import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import {Auth, NoAuth} from './layout/Auth';
import Dashboard from './pages/Dashboard';
import {AuthProvider} from './context/AuthProvider';
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
                    <Route path="*" element={<h1>404 Not Found</h1>} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;