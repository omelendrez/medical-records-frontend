import React from 'react'
import { Link } from 'react-router-dom'
import { getSexName } from '../../services/utils'
import './Pet.css'

const Pet = ({ data, deletePet, editPet }) => {

  const { id, name, type, breed, sex, observations, customerId, customerName } = data
  return (
    <tr>
      <td className="name">
        <Link to={{ pathname: `/clientes/${customerId}/${id}`, state: { from: '/pacientes' } }}>{name}</Link>
      </td>
      <td className="customer-row">{customerName}</td>
      <td>{type}</td>
      <td>{breed}</td>
      <td>{getSexName(sex)}</td>
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