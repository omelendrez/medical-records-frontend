import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Customer from './Customer'
import { getCustomers, deleteCustomer } from '../../services/customers'

const Customers = ({ filter }) => {

  const [customers, setCustomers] = useState({ rows: [] })
  const [addCustomer, setAddCustomer] = useState(false)

  useEffect(() => {
    getCustomers(filter)
      .then(customers => setCustomers(customers))
  }, [filter])

  const handleDelete = customer => {
    deleteCustomer(customer)
      .then(() => getCustomers(filter)
        .then(customers => setCustomers(customers))
      )
  }

  const handleEdit = customer => {
    console.log(customer)
  }

  const { rows } = customers

  return (
    <>
      {addCustomer && <Redirect to="./nuevo-cliente" />}
      <div className="container-fluid">
        <button className="btn btn-primary my-1 float-right" onClick={() => setAddCustomer(true)}>Agregar</button>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Dirección</th>
              <th scope="col">Teléfono</th>
              <th scope="col">Email</th>
              <th scope="col" colSpan="2"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((record, index) =>
              <Customer
                key={index}
                indice={index + 1}
                data={record}
                deleteCustomer={() => handleDelete(record)}
                editCustomer={() => handleEdit(record)}
              />
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Customers