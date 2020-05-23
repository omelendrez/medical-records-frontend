import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Consultation from './Consultation'
import Confirm from '../../Confirm'
import { getConsultationsByPet, deleteConsultation } from '../../../services/consultations'
import { formatDate } from '../../../services/utils'

const Consultations = ({ pet }) => {
	const [redirect, setRedirect] = useState('')
	const [selected, setSelected] = useState({})
	const [showConfirm, setShowConfirm] = useState(false)
	const [consultations, setConsultations] = useState({ rows: [], count: 0 })

	useEffect(() => {
		getConsultationsByPet(pet.id)
			.then(consultations => {
				setConsultations(consultations)
			})
	}, [pet.id])

	const handleEditConsultation = id => {
		setRedirect({
			pathname: `/edit-consulta/${id}`,
			state: {
				from: `/clientes/${pet.customerId}/${pet.id}`
			}
		})
	}

	const handleDeleteConsultation = consultation => {
		setSelected(consultation)
		setShowConfirm(true)
	}

	const confirmDelete = () => {
		deleteConsultation(selected)
			.then(() => getConsultationsByPet(pet.id)
				.then(consultations => {
					setConsultations(consultations)
					setShowConfirm(false)
				}))
	}

	const { count, rows } = consultations

	return (
		<>
			{redirect && <Redirect to={redirect} />}

			<div className="consultations">
				{showConfirm &&
					<Confirm
						title="Eliminando consulta"
						question={`Desea eliminar consulta del ${formatDate(selected.date)} del paciente ${pet.name}?`}
						okButton="Eliminar"
						cancelButton="Cancelar"
						cancelDelete={() => setShowConfirm(false)}
						confirmDelete={() => confirmDelete()}
					/>
				}
				{!count && <div className="container text-center">
					<div className="alert alert-warning">El paciente no registra consultas</div>
				</div>
				}
				<div className="consultations-list overflow-auto">
					{rows.map((consultation, index) => <Consultation
						key={index}
						consultation={consultation}
						editConsultation={handleEditConsultation}
						deleteConsultation={handleDeleteConsultation}
					/>)}
				</div>
			</div>
		</>
	)
}

export default Consultations