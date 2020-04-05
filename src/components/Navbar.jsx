import React from 'react'
import { useLocation } from 'react-router-dom'
import NavLink from './NavLink'

const Navbar = () => {
  const { pathname: page } = useLocation()
  const hasSearch = page === '/clientes' || page === '/pacientes' || page === '/consultas'
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/clientes">Clientes</NavLink>
          <NavLink to="/pacientes">Pacientes</NavLink>
          <NavLink to="/consultas">Consultas</NavLink>
        </ul>
        {
          hasSearch &&
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" aria-label="Search" />
            <button className="btn btn-warning" type="submit">Buscar</button>
          </form>
        }
      </div>
    </nav>
  )
}

export default Navbar