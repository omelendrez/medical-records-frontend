import React from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../../services/utils'
import TableActions from '../TableActions'

const Vaccination = ({ data, deleteVaccination, editVaccination }) => {

    const { date, petName, customerName, vaccination, nextAppointment, petId, customerId } = data

    return (
        <tr>
            <td className="text-nowrap">
                {formatDate(date)}
            </td>
            <td>
                <Link to={{ pathname: `/clientes/${customerId}/${petId}`, state: { current: 'vacunaciones' } }}>{petName}</Link>

            </td>
            <td>{customerName}</td>
            <td>{vaccination}</td>
            <td className="text-nowrap">{nextAppointment ? formatDate(nextAppointment) : ''}</td>
            <TableActions
                actionDelete={deleteVaccination}
                actionEdit={editVaccination}
                data={data}
            />
        </tr>
    )
}

export default Vaccination