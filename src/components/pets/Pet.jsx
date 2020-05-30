import React from 'react'
import { Link } from 'react-router-dom'
import { getSexName, getAge } from '../../services/utils'
import './Pet.css'
import TableActions from '../TableActions'

const Pet = ({ data, deletePet, editPet }) => {

  const { id, name, type, breed, sex, birthDate, customerId, customerName } = data
  return (
    <tr>
      <td className="name">
        <Link to={{ pathname: `/clientes/${customerId}/${id}`, state: { from: '/pacientes' } }}>{name}</Link>
      </td>
      <td className="customer-row">{customerName}</td>
      <td>{type}</td>
      <td>{breed}</td>
      <td>{getSexName(sex)}</td>
      <td>{getAge(birthDate)}</td>

      <TableActions
        actionDelete={deletePet}
        actionEdit={editPet}
        data={data}
      />
    </tr>
  )
}

export default Pet