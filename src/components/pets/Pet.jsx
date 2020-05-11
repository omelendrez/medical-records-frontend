import React from 'react'
import { Link } from 'react-router-dom'
import './Pet.css'

const Pet = ({ data, deletePet, editPet }) => {

  const { id, name, type, breed, sex, observations, customerId, customerName } = data

  return (
    <tr>
      <td className="name">
        <Link to={`/clientes/${customerId}/${id}`}>{name}</Link>
      </td>
      <td>
        <Link className="customer-row" to={`/clientes/${customerId}`}>{customerName}</Link>
      </td>
      <td>{type}</td>
      <td>{breed}</td>
      <td>{sex}</td>
      <td>{observations}</td>
      <td style={{ width: '120px' }}>
        <button
          className="btn btn-danger"
          onClick={() => deletePet(data)}
        >Eliminar</button>
      </td>
      <td style={{ width: '120px' }}>
        <button
          className="btn btn-info"
          onClick={() => editPet(data)}
        >Modificar</button>
      </td>
    </tr>
  )
}

export default Pet