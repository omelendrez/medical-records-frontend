import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import NavLink from './NavLink'

const Navbar = ({ doSearch }) => {
  const { pathname: page } = useLocation()
  const hasSearch = page === '/clientes' || page === '/pacientes' || page === '/consultas' || page === '/deudores'

  const [search, setSearch] = useState('')

  const onChange = e => {
    setSearch(e.target.value)
  }

  const onClick = (e) => {
    e.preventDefault()
    doSearch(search)
  }

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
        {
          hasSearch &&
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              aria-label="Search"
              onChange={e => onChange(e)}
            />
            <button
              className="btn btn-warning"
              onClick={e => onClick(e)}
            >Buscar</button>
          </form>
        }
      </div>
    </nav>
  )
}

export default Navbar