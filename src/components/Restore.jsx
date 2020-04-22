import React, { useState, useEffect } from 'react'
import { getCustomers } from '../services/customers'
import { getPets } from '../services/pets'
import { getConsultations } from '../services/consultations'

const Restore = props => {

  const [records, setRecords] = useState({})
  const [error, setError] = useState('')

  const fieldsDefault = {
    clientes: [
      'id', 'name', 'address'
    ],
    pacientes: [
      'id', 'name', 'type'
    ],
    consultas: [
      'id', 'date', 'pet.name', 'diagnosis'
    ]
  }

  const fields = fieldsDefault[props.match.params.table]

  useEffect(() => {
    switch (props.match.params.table) {
      case 'clientes':
        getCustomers('')
          .then(customers => setRecords(customers))
        break;
      case 'pacientes':
        getPets('')
          .then(pets => setRecords(pets))
        break;
      case 'consultas':
        getConsultations('')
          .then(consultations => setRecords(consultations))
        break;
      default:
        setError('Tabla inexistente')
    }
  }, [props.match.params.table])

  const { rows } = records

  return (
    <div className="restore">
      {error && <div className="alert alert-warning">
        {error}
      </div>
      }
      {rows && <table className="table">
        <tbody>
          {rows.map((record, index) => (
            <tr key={index}>
              {fields.map((field, index) => <td key={index}>{record[field]}</td>)}
            </tr>
          ))
          }
        </tbody>
      </table>
      }
    </div >
  )
}

export default Restore