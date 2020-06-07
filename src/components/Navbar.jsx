import React, { useEffect, useState } from 'react'
import NavLink from './NavLink'
import { logout, getUser } from '../services/utils'

const Navbar = () => {
  const [user, setUser] = useState({})
  useEffect(() => {
    setUser(getUser())
  }, [])

  const handleLogout = e => {
    e.preventDefault()
    logout()
  }
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/clientes">Clientes</NavLink>
          <NavLink to="/pacientes">Pacientes</NavLink>
          <NavLink to="/consultas">Consultas</NavLink>
          <NavLink to="/vacunaciones">Vacunaciones</NavLink>
          <NavLink to="/desparasitaciones">Desparasitaciones</NavLink>
          <NavLink to="/deudores">Deudores</NavLink>
        </ul>
        <div className="text-white mr-2 text-capitalize">{user.name}</div>
        <button
          className="btn btn-warning btn-sm"
          onClick={e => handleLogout(e)}
        >Logout</button>
      </div>
    </nav>
  )
}

export default Navbar