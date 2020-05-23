import React, { useEffect, useState } from 'react'
import Pagination from '../Pagination'
import Loading from '../Loading'
import { getDebtors } from '../../services/customers'
import { Link } from 'react-router-dom'

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
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    const updateState = () => {
      setLoading(true)
      const pag = pagination
      getDebtors(pagination)
        .then(debtors => {
          pag.totRecords = debtors.count.length
          setPagination(pag)
          setDebtors(debtors)
          setLoading(false)
        })
    }
    updateState()
  }, [pagination])

  const handleChange = e => {
    setFilter(e.target.value)
    if (!e.target.value) setPagination({ ...pagination, filter: '' })
  }

  const handleClick = (e) => {
    e.preventDefault()
    setPagination({ ...pagination, filter, curPage: 1 })
  }

  const changePage = page => {
    setPagination({ ...pagination, curPage: page })
  }

  const totPages = Math.ceil(pagination.totRecords / pagination.limit)
  const { rows } = debtors

  return (
    <>
      {loading && <Loading />}
      {!loading &&
        <div className="container-fluid">
          <table className="table table-sm">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Paciente</th>
                <th scope="col">Domicilio</th>
                <th scope="col">Teléfono</th>
                <th scope="col" className="text-right">Deuda</th>
                <th scope="col" style={{ minWidth: '120px' }} colSpan="2">
                </th>
              </tr>
            </thead>
            <tbody>
              {rows
                .map(debtor =>
                  <tr key={debtor.id}>
                    <td className="name">
                      <Link to={{ pathname: `/clientes/${debtor.id}`, state: { from: '/deudores' } }}>{debtor.name}</Link>
                    </td>
                    <td>{debtor.pets.map(pet => pet.name).join(', ')}</td>
                    <td>{debtor.address}</td>
                    <td>{debtor.phone}</td>
                    <td className="text-right">$ {debtor.balance.toFixed(2)}</td>
                    <td className="text-right">
                      <button className="btn btn-primary">Cancelar</button>
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
          <div className="row">
            <div className="col-4">
              <form className="form-inline">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  aria-label="Search"
                  onChange={e => handleChange(e)}
                  value={filter}
                />
                <button
                  className="btn btn-warning"
                  onClick={e => handleClick(e)}
                >Buscar</button>
              </form>
            </div>
            <div className="col-4">
              {totPages > 1 && <Pagination pagination={pagination} changePage={changePage} />}
            </div>
          </div>
        </div>
      }
    </>
  )
}


export default Debtors