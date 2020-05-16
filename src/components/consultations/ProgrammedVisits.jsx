import React from 'react'
import { Link } from 'react-router-dom'

const ProgrammedVisits = props => {
	const { consultations } = props
	const { rows } = consultations
	return (
		<>
			<div>ProgrammedVisits</div>
			<table className="table table-sm">
				<thead>
					<tr>
						<th>Paciente</th>
						<th>Domicilio</th>
						<th>Cliente</th>
						<th>Nueva consulta</th>
						<th>Proxima consulta</th>
						<th className="text-right">Telefono</th>
					</tr>
				</thead>
				<tbody>
					{rows
						.map(row =>
							<tr key={row.id}>
								<td className="name">
									<Link to={{ pathname: `/clientes/${row.id}`, state: { from: '/' } }}>{row.petName}</Link>
								</td>
								<td>{row.address}</td>
								<td>{row.customerName}</td>
								<td>{row.lastConsultation}</td>
								<td>{row.nextConsultation}</td>
								<td className="text-right">{row.phone}</td>
							</tr>
						)}
				</tbody>
			</table>
		</>)
}

export default ProgrammedVisits