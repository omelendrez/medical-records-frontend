import React from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../../services/utils'

const Consultation = ({ data, deleteConsultation, editConsultation }) => {

  const { date, petName, customerName, diagnosis, nextAppointment, petId, customerId } = data

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
      <td>{diagnosis}</td>
      <td className="text-nowrap">{nextAppointment ? formatDate(nextAppointment) : ''}</td>
      <td style={{ width: '120px' }}>
        <button
          className="btn btn-danger"
          onClick={() => deleteConsultation(data)}
        >Eliminar</button>
      </td>
      <td style={{ width: '120px' }}>
        <button
          className="btn btn-info"
          onClick={() => editConsultation(data)}
        >Modificar</button>
      </td>
    </tr>
  )
}

export default Consultation