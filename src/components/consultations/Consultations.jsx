import React, { useState, useEffect } from 'react'
import Consultation from './Consultation'
import { getConsultations } from '../../services/consultations'

const Consultations = ({ filter }) => {

  const [consultations, setConsultations] = useState({ rows: [] })

  useEffect(() => {
    getConsultations()
      .then(consultations => setConsultations(consultations))
  }, [])

  const { rows } = consultations

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Tipo</th>
          <th scope="col">Raza</th>
          <th scope="col">Próxima consulta</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((record, index) =>
          <Consultation
            key={index}
            indice={index + 1}
            data={record}
          />
        )}
      </tbody>
    </table>
  )
}

export default Consultations