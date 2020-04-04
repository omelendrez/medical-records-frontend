import React from 'react'

const Pet = ({ data, indice }) => {

  const { name, type, breed } = data

  return (
    <tr>
      <td>{indice}</td>
      <td>{name}</td>
      <td>{type}</td>
      <td>{breed}</td>
    </tr>
  )
}

export default Pet