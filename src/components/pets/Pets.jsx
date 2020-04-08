import React, { useState, useEffect } from 'react'
import Pet from './Pet'
import { getPets } from '../../services/pets'

const Pets = ({ filter }) => {

  const [pets, setPets] = useState({ rows: [] })

  useEffect(() => {
    getPets(filter)
      .then(pets => setPets(pets))
  }, [filter])

  const { rows } = pets

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Tipo</th>
          <th scope="col">Raza</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((record, index) =>
          <Pet
            key={index}
            indice={index + 1}
            data={record}
          />
        )}
      </tbody>
    </table>
  )
}

export default Pets