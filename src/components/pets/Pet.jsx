import React from 'react'
import { Link } from 'react-router-dom'

const Pet = ({ data, deletePet, editPet }) => {

  const { id, name, type, breed } = data

  return (
    <tr>
      <td>{id}</td>
      <td className="name">
        <Link to={`/pacientes/${id}`}>{name}</Link>
      </td>
      <td>{type}</td>
      <td>{breed}</td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => deletePet(data)}
        >Eliminar</button>
      </td>
      <td>
        <button
          className="btn btn-info"
          onClick={() => editPet(data)}
        >Modificar</button>
      </td>
    </tr>
  )
}

export default Pet