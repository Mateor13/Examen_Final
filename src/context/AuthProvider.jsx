import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({})

    const perfil = async() => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/visualizar/perfil`;
            const token = localStorage.getItem('token');
            const respuesta = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setAuth(respuesta.data.usuario)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token)
        {
            perfil(token)
        }
    }, [])

    return (
        <AuthContext.Provider value={
            {
                auth, 
                setAuth
            }
        }>
            {children}
        </AuthContext.Provider>
    )
}

export{AuthProvider}

export default AuthContext