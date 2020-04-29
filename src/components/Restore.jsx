import React, { useState, useEffect } from 'react'
import Pagination from './Pagination'
import { fieldsDefault } from '../services/utils'

const Restore = props => {
  const paginationDefault = {
    curPage: 1,
    totRecords: 0,
    limit: 5,
    filter: ''
  }

  const [records, setRecords] = useState({})
  const [error, setError] = useState('')
  const [update, setUpdate] = useState(false)
  const [pagination, setPagination] = useState(paginationDefault)

  const table = props.match.params.table;

  const fields = fieldsDefault[table].fields
  const getRecords = fieldsDefault[table].getRecords
  const restoreRecord = fieldsDefault[table].restoreRecord

  const handleRestore = record => {
    restoreRecord(record)
      .then(() => setUpdate(!update))
  }

  const changePage = page => {
    setPagination({ ...pagination, curPage: page })
    setUpdate(!update)
  }

  useEffect(() => {
    getRecords(pagination)
      .then(records => {
        setRecords(records)
        if (!records.count) {
          setError('No hay registros para recuperar')
        }
        setPagination({ ...pagination, totRecords: records.count })
      })
  }, [update])

  const { rows } = records
  const totPages = Math.ceil(pagination.totRecords / pagination.limit)

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
      {totPages > 1 && <Pagination pagination={pagination} changePage={changePage} />}
    </div >
  )
}

export default Restore