import {useContext} from 'react'
import {Link, Navigate, Outlet, useLocation} from 'react-router-dom'

const Dashboard = () => {
    const location = useLocation()
    const urlActual = location.pathname

    const {auth} = useContext(AuthContext)
    

}
export default Dashboard
