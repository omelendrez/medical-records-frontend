import React from 'react'
import Customer from './Customer'

import { customers } from '../data/customers.json'

const Customers = () => {

  const { rows } = customers

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Dirección</th>
          <th scope="col">Teléfono</th>
          <th scope="col">Email</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((record, index) =>
          <Customer
            key={index}
            indice={index + 1}
            data={record}
          />
        )}
      </tbody>
    </table>
  )
}

export default Customers