import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Pet from './Pet'
import Confirm from '../Confirm'
import Pagination from '../Pagination'
import { getPets, deletePet } from '../../services/pets'

const Pets = ({ filter }) => {

  const paginationDefault = {
    curPage: 1,
    totRecords: 0,
    limit: 10,
    filter
  }

  const [pets, setPets] = useState({ rows: [] })
  const [showConfirm, setShowConfirm] = useState(false)
  const [selected, setSelected] = useState({})
  const [redirect, setRedirect] = useState('')
  const [pagination, setPagination] = useState(paginationDefault)


  useEffect(() => {
    const pag = pagination
    getPets(pagination)
      .then(pets => {
        pag.totRecords = pets.count
        setPagination(pag)
        setPets(pets)
      })
  }, [pagination])

  const changePage = page => {
    setPagination({ ...pagination, curPage: page })
  }

  const handleDelete = pet => {
    setSelected(pet)
    setShowConfirm(true)
  }

  const confirmDelete = () => {
    deletePet(selected)
      .then(() => getPets(pagination)
        .then(pets => {
          setPets(pets)
          setShowConfirm(false)
        })
      )
  }

  const handleEdit = pet => {
    setRedirect(`./edit-paciente/${pet.id}`)
  }

  const handleRestore = () => {
    setRedirect('/restaurar/pacientes')
  }

  const { rows } = pets
  const totPages = Math.round(pagination.totRecords / pagination.limit)

  return (
    <>
      {showConfirm &&
        <Confirm
          title="Eliminando paciente"
          question={`Desea eliminar paciente ${selected.name}?`}
          okButton="Eliminar"
          cancelButton="Cancelar"
          cancelDelete={() => setShowConfirm(false)}
          confirmDelete={() => confirmDelete()}
        />
      }
      {redirect && <Redirect to={redirect} />}
      <div className="container-fluid">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Tipo</th>
              <th scope="col">Raza</th>
              <th scope="col">Observaciones</th>
              <th scope="col" colSpan="2"> </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((record, index) =>
              <Pet
                key={index}
                indice={index + 1}
                data={record}
                deletePet={() => handleDelete(record)}
                editPet={() => handleEdit(record)}
              />
            )}
          </tbody>
        </table>
        {totPages > 1 && <Pagination pagination={pagination} changePage={changePage} />}
        <div className="float-right">
          <button
            className="btn btn-warning"
            onClick={() => handleRestore()}
          >
            Restaurar
          </button>
        </div>

      </div>
    </>
  )
}

export default Pets