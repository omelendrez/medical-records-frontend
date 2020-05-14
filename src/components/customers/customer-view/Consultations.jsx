import React from 'react'
import Consultation from './Consultation'

const Consultations = ({ consultations, editConsultation, deleteConsultation }) => {

	return (
		<div className="consultations">
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