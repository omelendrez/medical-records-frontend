import React from 'react'
import { useLocation } from 'react-router-dom'
import NavLink from './NavLink'

const Navbar = () => {
  const { pathname: page } = useLocation()
  const hasSearch = page === '/clientes' || page === '/pacientes' || page === '/consultas' || page === '/deudores'

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/clientes">Clientes</NavLink>
          <NavLink to="/pacientes">Pacientes</NavLink>
          <NavLink to="/consultas">Consultas</NavLink>
          <NavLink to="/deudores">Deudores</NavLink>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar