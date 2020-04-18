import React from 'react'
import { Link } from 'react-router-dom'

const Consultation = ({ data, deleteConsultation, editConsultation }) => {

  const { id, date, diagnosis, treatment, nextConsultation, pet } = data

  return (
    <tr>
      <td>{id}</td>
      <td className="date text-nowrap">
        <Link to={`/consultas/${id}`}>{date}</Link>
      </td>
      <td>{pet.name}</td>
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