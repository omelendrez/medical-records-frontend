import React from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../../services/utils'

const ProgrammedVisits = ({ consultations }) => {
	return (
		<div className="container">
			<h5 className="header">Visitas Programadas</h5>
			<table className="table table-sm">
				<tbody>
					{consultations
						.map(consultation => {
							const { id, customerId, petId, customerName, petName, nextAppointment } = consultation
							return (
								<tr key={id}>
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