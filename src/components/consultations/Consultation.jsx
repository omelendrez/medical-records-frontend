import React from 'react'
import { Link } from 'react-router-dom'

const Consultation = ({ data, deleteConsultation, editConsultation }) => {

  const { date, diagnosis, treatment, nextConsultation, petId, customerId, pet } = data

  return (
    <tr>
      <td className="text-nowrap">
        {date}
      </td>
      <td>
        <Link to={`/clientes/${customerId}/${petId}`}>
          {pet.name}
        </Link>
      </td>
      <td>{diagnosis.substring(0, 30)}</td>
      <td>
        <div className="truncate" style={{ width: '400px' }}>
          {treatment.substring(0, 60)}
        </div>
      </td>
      <td className="text-nowrap">{nextConsultation}</td>
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