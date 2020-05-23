import React from 'react'
import Balance from './Balance'
import { formatDate } from '../../../services/utils'

const Consultation = ({ consultation, editConsultation, deleteConsultation }) => {
  const { id, date, anamnesis, clinicalExamination, diagnosis, treatment, nextAppointment, amount, paid } = consultation

  return (
    <div className="card consultation">
      <div className="card-body">
        {amount > 0 && <Balance amount={amount} paid={paid} />}
        <h6 className="card-title">{formatDate(date)}</h6>
        {anamnesis && <p className="card-text anamnesis ">{anamnesis}</p>}
        {clinicalExamination && <h6 className="card-subtitle mb-2">Examen Clinico: {clinicalExamination}</h6>}
        {diagnosis && <h6 className="card-subtitle mb-2">Diagnóstico: {diagnosis}</h6>}
        {treatment && <p className="card-text texts">Tratamiento: {treatment}</p>}
        {nextAppointment && <h6 className="card-subtitle mb-2">Próxima consulta: {nextAppointment}</h6>}
        <div>
          <button
            type="button"
            className="btn btn-info m-1"
            onClick={() => editConsultation(id)}
          >Modificar</button>
          <button
            type="button"
            className="btn btn-danger m-1 float-right"
            onClick={() => deleteConsultation(consultation)}
          >Eliminar</button>
        </div>
      </div>
    </div>
  )
}

export default Consultation