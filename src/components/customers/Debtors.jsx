import React, { useEffect, useState } from 'react'
import Pagination from '../Pagination'
import { getDebtors } from '../../services/customers'

const Debtors = () => {
  const [filter, setFilter] = useState('')
  const paginationDefault = {
    curPage: 1,
    totRecords: 0,
    limit: 10,
    filter
  }

  const [debtors, setDebtors] = useState({ rows: [] })
  const [pagination, setPagination] = useState(paginationDefault)

  useEffect(() => {
    updateState()
  }, [pagination])

  const updateState = () => {
    const pag = pagination
    getDebtors(pagination)
      .then(debtors => {
        pag.totRecords = debtors.count.length
        setPagination(pag)
        setDebtors(debtors)
      })
  }

  const handleChange = e => {
    setFilter(e.target.value)
  }

  const handleClick = (e) => {
    e.preventDefault()
    setPagination({ ...pagination, filter })
  }

  const changePage = page => {
    setPagination({ ...pagination, curPage: page })
  }

  const totPages = Math.ceil(pagination.totRecords / pagination.limit)
  const { rows } = debtors

  return (
    <div className="container-fluid">
      <table className="table table-sm">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Domicilio</th>
            <th>Teléfono</th>
            <th className="text-right">Debe</th>
          </tr>
        </thead>
        <tbody>
          {rows
            .map(debtor =>
              <tr key={debtor.id}>
                <td>{debtor.name}</td>
                <td>{debtor.address}</td>
                <td>{debtor.phone}</td>
                <td className="text-right">${debtor.debt}</td>
              </tr>
            )}
        </tbody>
      </table>
      <div className="row">

        <form className="form-inline">
          <input
            className="form-control mr-sm-2"
            type="search"
            aria-label="Search"
            onChange={e => handleChange(e)}
          />
          <button
            className="btn btn-warning"
            onClick={e => handleClick(e)}
          >Buscar</button>
        </form>
        <div className="col-4"></div>
        {totPages > 1 && <Pagination pagination={pagination} changePage={changePage} />}
        <div className="col-4"></div>
      </div>

    </div>
  )
}

export default Debtors