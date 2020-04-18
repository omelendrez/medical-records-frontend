import React from 'react'
import { Link } from 'react-router-dom'
import './Customer.css'

const Customer = ({ data, deleteCustomer, editCustomer }) => {

  const { id, name, address, phone, email, pets, observations } = data
  const petsList = pets.map(pet => pet.name)

  return (
    <tr>
      <td>{id}</td>
      <td className="name">
        <Link to={`/clientes/${id}`}>{name}</Link>
        <div className="pet-list">
          {petsList.join(', ')}
        </div>
      </td>
      <td>{address}</td>
      <td>{phone}</td>
      <td>{email}</td>
      <td>{observations}</td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => deleteCustomer(data)}
        >Eliminar</button>
      </td>
      <td>
        <button
          className="btn btn-info"
          onClick={() => editCustomer(data)}
        >Modificar</button>
      </td>
    </tr>
  )
}

export default Customer