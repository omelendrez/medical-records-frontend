import React from 'react'
import { Link } from 'react-router-dom'
import './Customer.css'

const Customer = ({ data, deleteCustomer, editCustomer }) => {

  const { id, name, address, phone, pets, observations } = data
  const petsList = pets.map(pet => pet.name)

  return (
    <tr>
      <td className="name">
        <Link to={`/clientes/${id}`}>{name}</Link>
      </td>
      <td>
        <div className="pet-list">
          {petsList.join(', ')}
        </div>
      </td>
      <td>{address}</td>
      <td>{phone}</td>
      <td>{observations}</td>
      <td style={{ width: '120px' }}>
        <button
          className="btn btn-danger"
          onClick={() => deleteCustomer(data)}
        >Eliminar</button>
      </td>
      <td style={{ width: '120px' }}>
        <button
          className="btn btn-info"
          onClick={() => editCustomer(data)}
        >Modificar</button>
      </td>
    </tr>
  )
}

export default Customer