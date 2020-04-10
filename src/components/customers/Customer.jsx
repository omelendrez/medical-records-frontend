import React from 'react'
import './Customer.css'

const Customer = ({ data, indice, deleteCustomer, editCustomer }) => {

  const { name, address, phone, email, pets } = data
  const petsList = pets.map(pet => pet.name)

  return (
    <tr>
      <td>{indice}</td>
      <td className="name">{name}
        <div className="pet">
          {petsList.join(', ')}
        </div>
      </td>
      <td>{address}</td>
      <td>{phone}</td>
      <td>{email}</td>
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