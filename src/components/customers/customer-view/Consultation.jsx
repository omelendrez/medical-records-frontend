import React from 'react'
import Balance from './Balance'
import { formatDate } from '../../../services/utils'

const Consultation = ({ consultation, editConsultation, deleteConsultation }) => {
  const { id, date, anamnesis, clinicalExamination, diagnosis, treatment, nextAppointment, amount, paid, vaccination, deworming } = consultation

  return (
    <div className="card consultation">
      <div className="card-body">
        {amount > 0 && <Balance amount={amount} paid={paid} />}
        <h6 className="card-title">{formatDate(date)}</h6>
        {anamnesis && <p className="card-text">Anamnesis: {anamnesis}</p>}
        {clinicalExamination && <p className="card-text">Examen Clinico: {clinicalExamination}</p>}
        {diagnosis && <p className="card-text">Diagnóstico: {diagnosis}</p>}
        {treatment && <p className="card-text">Tratamiento: {treatment}</p>}
        {vaccination && <p className="card-text">Vacunación: {vaccination}</p>}
        {deworming && <p className="card-text">Desparasitación: {deworming}</p>}
        {nextAppointment && <h6 className="card-text">Próxima consulta: {formatDate(nextAppointment)}</h6>}
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