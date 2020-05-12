import React from 'react'
import Consultation from './Consultation'

const Consultations = ({ consultations, addConsultation, editConsultation, deleteConsultation }) => {

	return (
		<div className="consultations">
			<div className="text-right">
				<button
					type="button"
					className="btn btn-primary m-1 add-consultation"
					onClick={e => addConsultation(e)}
				>Agregar Consulta</button>
			</div>
			{!consultations.length && <div className="container text-center">
				<div className="alert alert-warning">El paciente no registra consultas</div>
			</div>
			}
			{consultations.length > 0 && <div className="consultations-list overflow-auto">
				{consultations.map((consultation, index) => <Consultation
					key={index}
					consultation={consultation}
					editConsultation={editConsultation}
					deleteConsultation={deleteConsultation}
				/>)}
			</div>
			}
		</div>
	)
}

export default Consultations