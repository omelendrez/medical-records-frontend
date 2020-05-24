import React from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../../services/utils'

const Vaccination = ({ data, deleteVaccination, editVaccination }) => {

    const { date, petName, customerName, vaccination, nextAppointment, petId, customerId } = data

    return (
        <tr>
            <td className="text-nowrap">
                {formatDate(date)}
            </td>
            <td>
                <Link to={`/clientes/${customerId}/${petId}`}>
                    {petName}
                </Link>
            </td>
            <td>{customerName}</td>
            <td>{vaccination}</td>
            <td className="text-nowrap">{nextAppointment ? formatDate(nextAppointment) : ''}</td>
            <td style={{ width: '120px' }}>
                <button
                    className="btn btn-danger"
                    onClick={() => deleteVaccination(data)}
                >Eliminar</button>
            </td>
            <td style={{ width: '120px' }}>
                <button
                    className="btn btn-info"
                    onClick={() => editVaccination(data)}
                >Modificar</button>
            </td>
        </tr>
    )
}

export default Vaccination