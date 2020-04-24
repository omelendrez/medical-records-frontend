import React, { useState, useEffect } from 'react'
import { getInactiveCustomers, restoreCustomer } from '../services/customers'
import { getInactivePets, restorePet } from '../services/pets'
import { getInactiveConsultations, restoreConsultation } from '../services/consultations'
import { fieldsDefault } from '../services/utils'

const Restore = props => {

  const [records, setRecords] = useState({})
  const [error, setError] = useState('')
  const [update, setUpdate] = useState(false)

  const fields = fieldsDefault[props.match.params.table].fields

  const handleRestore = record => {
    switch (props.match.params.table) {
      case 'clientes':
        restoreCustomer(record)
          .then(() => setUpdate(!update))
        break;
      case 'pacientes':
        restorePet(record)
          .then(() => setUpdate(!update))
        break;
      case 'consultas':
        restoreConsultation(record)
          .then(() => setUpdate(!update))
        break;
      default:
        setError('No se pudo restaurar el registro')
    }
  }

  useEffect(() => {
    switch (props.match.params.table) {
      case 'clientes':
        getInactiveCustomers()
          .then(customers => setRecords(customers))
        break;
      case 'pacientes':
        getInactivePets()
          .then(pets => setRecords(pets))
        break;
      case 'consultas':
        getInactiveConsultations()
          .then(consultations => setRecords(consultations))
        break;
      default:
        setError('Tabla inexistente')
    }
  }, [props.match.params.table, update])

  const { rows } = records

  return (
    <div className="restore">
      {error && <div className="alert alert-warning">
        {error}
      </div>
      }
      {rows && <table className="table">
        <thead>
          <tr>
            {fields.map(field => <th scope="col">{field.title}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((record, index) => (
            <tr key={index}>
              {fields.map((field, index) => <td key={index} className={field.className || null} >{record[field.name]}</td>)}
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => handleRestore(record)}
                >Restaurar</button>
              </td>
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