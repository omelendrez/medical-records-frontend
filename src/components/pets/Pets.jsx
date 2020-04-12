import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Pet from './Pet'
import { getPets, deletePet } from '../../services/pets'

const Pets = ({ filter }) => {

  const [pets, setPets] = useState({ rows: [] })
  const [addPet, setAddPet] = useState(false)
  const [editPet, setEditPet] = useState(false)

  useEffect(() => {
    getPets(filter)
      .then(pets => setPets(pets))
  }, [filter])

  const handleDelete = pet => {
    deletePet(pet)
      .then(() => getPets(filter)
        .then(pets => setPets(pets))
      )
  }

  const handleEdit = pet => {
    setEditPet(`./edit-paciente/${pet.id}`)
  }

  const { rows } = pets

  return (
    <>
      {editPet && <Redirect to={editPet} />}
      {addPet && <Redirect to="./nuevo-paciente" />}
      <div className="container-fluid">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Tipo</th>
              <th scope="col">Raza</th>
              <th scope="col" colSpan="2">
                <button className="btn btn-primary my-1 float-right" onClick={() => setAddPet(true)}>Agregar</button>
              </th>
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
      </div>
    </>
  )
}

export default Pets