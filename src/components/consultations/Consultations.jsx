import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Consultation from './Consultation'
import { getConsultations, deleteConsultation } from '../../services/consultations'

const Consultations = ({ filter }) => {

  const [consultations, setConsultations] = useState({ rows: [] })
  const [editConsultation, setEditConsultation] = useState(false)

  useEffect(() => {
    getConsultations(filter)
      .then(consultations => setConsultations(consultations))
  }, [filter])

  const handleDelete = Consultation => {
    deleteConsultation(Consultation)
      .then(() => getConsultations(filter)
        .then(consultations => setConsultations(consultations))
      )
  }

  const handleEdit = Consultation => {
    setEditConsultation(`./edit-consulta/${Consultation.id}`)
  }

  const { rows } = consultations

  return (
    <>
      {editConsultation && <Redirect to={editConsultation} />}
      <div className="container-fluid">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Fecha consulta</th>
              <th scope="col">Diagnostico</th>
              <th scope="col">Tratamiento</th>
              <th scope="col">Nueva Consulta</th>
              <th scope="col" colSpan="2">
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((record, index) =>
              <Consultation
                key={index}
                indice={index + 1}
                data={record}
                deleteConsultation={() => handleDelete(record)}
                editConsultation={() => handleEdit(record)}
              />
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Consultations