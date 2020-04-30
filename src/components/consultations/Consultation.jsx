import React from 'react'
import { Link } from 'react-router-dom'

const Consultation = ({ data, deleteConsultation, editConsultation }) => {

  const { date, diagnosis, treatment, nextConsultation, petId, pet } = data

  return (
    <tr>
      <td className="text-nowrap">
        {date}
      </td>
      <td>
        <Link to={`/clientes/${pet.customer.id}/${petId}`}>
          {pet.name}
        </Link>
      </td>
      <td>{diagnosis}</td>
      <td>{treatment}</td>
      <td className="text-nowrap">{nextConsultation}</td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => deleteConsultation(data)}
        >Eliminar</button>
      </td>
      <td>
        <button
          className="btn btn-info"
          onClick={() => editConsultation(data)}
        >Modificar</button>
      </td>
    </tr>
  )
}

export default Consultation