import React from 'react'

const Customer = ({ data, indice }) => {

  const { name, address, phone, email } = data

  return (
    <tr>
      <td>{indice}</td>
      <td>{name}</td>
      <td>{address}</td>
      <td>{phone}</td>
      <td>{email}</td>
    </tr>
  )
}

export default Customer