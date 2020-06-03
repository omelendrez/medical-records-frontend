import React from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../services/utils'

const ProgrammedVisits = ({ appointments }) => {
	return (
		<div className="container">
			<h5 className="header">Visitas Programadas</h5>
			<table className="table table-sm">
				<tbody>
					{appointments
						.map((appointment, index) => {
							const { customerId, petId, customerName, petName, nextAppointment, type } = appointment
							return (
								<tr key={index}>
									<td>{type}</td>
									<td>{formatDate(nextAppointment)}</td>
									<td className="name">
										<Link to={{ pathname: `/clientes/${customerId}/${petId}`, state: { from: '/' } }}>
											{petName}
										</Link>
									</td>
									<td>{customerName}</td>
								</tr>
							)
						})
					}
				</tbody>
			</table>
		</div>
	)
}

export default ProgrammedVisits