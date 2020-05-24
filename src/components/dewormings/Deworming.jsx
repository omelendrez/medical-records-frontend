import React from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../../services/utils'

const Deworming = ({ data, deleteDeworming, editDeworming }) => {

  const { date, petName, customerName, deworming, nextAppointment, petId, customerId } = data

  return (
    <tr>
      <td className="text-nowrap">
        {formatDate(date)}
      </td>
      <td>
        <Link to={`/clientes/${customerId}/${petId}`}>
          {petName}
        </Link>
      </td>
      <td>{customerName}</td>
      <td>{deworming}</td>
      <td className="text-nowrap">{nextAppointment ? formatDate(nextAppointment) : ''}</td>
      <td style={{ width: '120px' }}>
        <button
          className="btn btn-danger"
          onClick={() => deleteDeworming(data)}
        >Eliminar</button>
      </td>
      <td style={{ width: '120px' }}>
        <button
          className="btn btn-info"
          onClick={() => editDeworming(data)}
        >Modificar</button>
      </td>
    </tr>
  )
}

export default Deworming