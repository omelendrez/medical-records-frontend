import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Consultation from './Consultation'
import Confirm from '../Confirm'
import { getConsultations, deleteConsultation } from '../../services/consultations'

const Consultations = ({ filter }) => {

  const [consultations, setConsultations] = useState({ rows: [] })
  const [editConsultation, setEditConsultation] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [selected, setSelected] = useState({})

  useEffect(() => {
    getConsultations(filter)
      .then(consultations => setConsultations(consultations))
  }, [filter])

  const handleDelete = consultation => {
    setSelected(consultation)
    setShowConfirm(true)
  }

  const confirmDelete = () => {
    deleteConsultation(selected)
      .then(() => getConsultations(filter)
        .then(consultations => setConsultations(consultations))
      )
    setShowConfirm(false)
  }

  const cancelDelete = () => {
    setSelected({})
    setShowConfirm(false)
  }

  const handleEdit = Consultation => {
    setEditConsultation(`./edit-consulta/${Consultation.id}`)
  }

  const { rows } = consultations

  return (
    <>
          {showConfirm &&
        <Confirm
          title="Eliminando cliente"
          question="Seguro quiere borrar este registro?"
          okButton="SI"
          cancelButton="NO"
          confirmDelete={confirmDelete}
          cancelDelete={cancelDelete}
        />
      }

      {editConsultation && <Redirect to={editConsultation} />}
      <div className="container-fluid">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Fecha</th>
              <th scope="col">Paciente</th>
              <th scope="col">Diagnostico</th>
              <th scope="col">Tratamiento</th>
              <th scope="col">Próx. Turno</th>
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