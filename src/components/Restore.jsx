import React, { useState, useEffect } from 'react'
import { fieldsDefault } from '../services/utils'

const Restore = props => {

  const [records, setRecords] = useState({})
  const [error, setError] = useState('')
  const [update, setUpdate] = useState(false)

  const table = props.match.params.table;

  const fields = fieldsDefault[table].fields
  const getRecords = fieldsDefault[table].getRecords
  const restoreRecord = fieldsDefault[table].restoreRecord

  const handleRestore = record => {
    restoreRecord(record)
      .then(() => setUpdate(!update))
  }

  useEffect(() => {
    getRecords()
      .then(records => {
        setRecords(records)
        if (!records.rows.length) {
          setError('No hay registros para recuperar')
        }
      })
  }, [update])

  const { rows } = records

  return (
    <div className="restore">
      {rows && <table className="table">
        <thead>
          <tr>
            {fields.map((field, index) => <th scope="col" key={index}>{field.title}</th>)}
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
      {error && <div className="alert alert-warning container text-center">
        {error}
      </div>
      }

    </div >
  )
}

export default Restore