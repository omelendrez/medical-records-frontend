import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Deworming from './Deworming'
import Confirm from '../Confirm'
import Pagination from '../Pagination'
import Loading from '../Loading'
import { getDewormings, deleteDeworming } from '../../services/dewormings'

const Dewormings = () => {
  const [filter, setFilter] = useState('')
  const paginationDefault = {
    curPage: 1,
    totRecords: 0,
    limit: 10,
    filter
  }

  const [dewormings, setDewormings] = useState({ rows: [] })
  const [showConfirm, setShowConfirm] = useState(false)
  const [selected, setSelected] = useState({})
  const [redirect, setRedirect] = useState('')
  const [pagination, setPagination] = useState(paginationDefault)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const updateState = () => {
      setLoading(true)
      const pag = pagination
      getDewormings(pagination)
        .then(dewormings => {
          pag.totRecords = dewormings.count
          setPagination(pag)
          setDewormings(dewormings)
          setLoading(false)
        })
    }
    updateState()
  }, [pagination])


  const changePage = page => {
    setPagination({ ...pagination, curPage: page })
  }

  const handleDelete = deworming => {
    setSelected(deworming)
    setShowConfirm(true)
  }

  const confirmDelete = () => {
    deleteDeworming(selected)
      .then(() => getDewormings(pagination)
        .then(dewormings => {
          setDewormings(dewormings)
          setShowConfirm(false)
        })
      )
  }

  const handleEdit = deworming => {
    setRedirect({
      pathname: `/edit-desparasitacion/${deworming.id}`,
      state: {
        from: '/desparasitaciones'
      }
    })

  }

  const handleRestore = () => {
    setRedirect('/restaurar/desparasitaciones')
  }

  const handleChange = e => {
    setFilter(e.target.value)
    if (!e.target.value) setPagination({ ...pagination, filter: '' })
  }

  const handleClick = (e) => {
    e.preventDefault()
    setPagination({ ...pagination, filter, curPage: 1 })
  }

  const { rows } = dewormings
  const totPages = Math.ceil(pagination.totRecords / pagination.limit)

  if (loading) return <Loading />

  return (
    <>
      {showConfirm &&
        <Confirm
          title="Eliminando desparasitación"
          question={`Desea eliminar desparasitación del ${selected.date} del paciente ${selected.petName}?`}
          okButton="Eliminar"
          cancelButton="Cancelar"
          cancelDelete={() => setShowConfirm(false)}
          confirmDelete={() => confirmDelete()}
        />
      }
      {redirect && <Redirect to={redirect} />}
      <div className="container-fluid">
        <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col">Fecha</th>
              <th scope="col">Paciente</th>
              <th scope="col">Cliente</th>
              <th scope="col">Desparasitación</th>
              <th scope="col" className="text-nowrap">Próx. Turno</th>
              <th scope="col" colSpan="2">
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((record, index) =>
              <Deworming
                key={index}
                indice={index + 1}
                data={record}
                deleteDeworming={() => handleDelete(record)}
                editDeworming={() => handleEdit(record)}
              />
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

          <div className="col-4">
            <div className="float-right">
              <button
                className="btn btn-outline-secondary"
                onClick={() => handleRestore()}>
                Restaurar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dewormings