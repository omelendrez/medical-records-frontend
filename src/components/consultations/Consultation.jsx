import React from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../../services/utils'

const Consultation = ({ data, deleteConsultation, editConsultation }) => {

  const { date, diagnosis, nextConsultation, petId, customerId, pet } = data

  return (
    <tr>
      <td className="text-nowrap">
        {formatDate(date)}
      </td>
      <td>
        <Link to={`/clientes/${customerId}/${petId}`}>
          {pet.name}
        </Link>
      </td>
      <td>{diagnosis.substring(0, 30)}</td>
      <td className="text-nowrap">{nextConsultation ? formatDate(nextConsultation) : ''}</td>
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