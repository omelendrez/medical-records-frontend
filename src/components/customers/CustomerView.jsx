import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Customer from './customer-view/Customer'
import Consultations from './customer-view/Consultations'
import { getCustomer, getDebt } from '../../services/customers'
import { getPet } from '../../services/pets'
import './CustomerView.css'

const CustomerView = props => {
	const [redirect, setRedirect] = useState('')
	const [customer, setCustomer] = useState({ pets: [] })
	const [pet, setPet] = useState({})
	const [debt, setDebt] = useState({})
	const { state } = props.location

	const setBack = () => {
		if (state) return setRedirect(state.from)
		setPet({})
		if (!props.match.params.petId) {
			setRedirect(`/clientes`)
		} else {
			setRedirect(`/clientes/${customer.id}`)
		}
	}

	const loadPet = pet => {
		setRedirect(`/clientes/${customer.id}/${pet.id}`)
	}

	useEffect(() => {
		getCustomer(props.match.params.id)
			.then(customer => {
				setCustomer(customer)
				const pet = { id: props.match.params.petId }
				if (props.match.params.petId) {
					selectPet(pet)
				}
			})
	}, [props.match.params.id, props.match.params.petId])

	useEffect(() => {
		getDebt(props.match.params.id)
			.then(debt => setDebt(debt))
	}, [props.match.params.id])

	const handleAddConsultation = e => {
		setRedirect({
			pathname: `/nueva-consulta/${customer.id}/${pet.id}`,
			state: {
				from: `/clientes/${customer.id}/${pet.id}`
			}
		})
	}

	const handleAddPet = e => {
		e.preventDefault()
		setRedirect(`/nuevo-paciente/${customer.id}`)
	}

	const selectPet = pet => {
		getPet(pet.id)
			.then(pet => setPet(pet))
	}

	return (
		<>
			{redirect && <Redirect to={redirect} />}
			<div className="main-container">
				<Customer
					customer={customer}
					pet={pet}
					handleAddPet={handleAddPet}
					loadPet={loadPet}
					setBack={setBack}
					debt={debt}
					addConsultation={handleAddConsultation}
				/>

				{pet.id && <Consultations pet={pet} />}
			</div>

		</>
	)
}

export default CustomerView
