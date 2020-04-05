import React from 'react'
import { useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()
  const hasSearch = location.pathname === '/clientes' || location.pathname === '/pacientes' || location.pathname === '/consultas'

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/clientes">Clientes</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/pacientes">Pacientes</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/consultas">Consultas</a>
          </li>
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