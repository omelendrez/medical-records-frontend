import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Customer from './Customer'
import Confirm from '../Confirm'
import { getCustomers, deleteCustomer } from '../../services/customers'

const Customers = ({ filter }) => {

  const [customers, setCustomers] = useState({ rows: [] })
  const [addCustomer, setAddCustomer] = useState(false)
  const [editCustomer, setEditCustomer] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [selected, setSelected] = useState({})

  useEffect(() => {
    getCustomers(filter)
      .then(customers => setCustomers(customers))
  }, [filter])

  const confirmDelete = () => {
    deleteCustomer(selected)
      .then(() => getCustomers(filter)
        .then(customers => setCustomers(customers))
      )
    setShowConfirm(false)
  }

  const handleDelete = customer => {
    setSelected(customer)
    setShowConfirm(true)
  }

  const cancelDelete = () => {
    setSelected({})
    setShowConfirm(false)
  }

  const handleEdit = customer => {
    setEditCustomer(`./edit-cliente/${customer.id}`)
  }

  const { rows } = customers

  return (
    <>
      {showConfirm &&
        <Confirm
          title="Eliminando cliente"
          question="Seguro quiere borrar este registro?"
          okButton="SI"
          cancelButton="NO"
          confirmDelete={confirmDelete}
          cancelDelete={cancelDelete}
        />
      }
      {editCustomer && <Redirect to={editCustomer} />}
      {addCustomer && <Redirect to="./nuevo-cliente" />}
      <div className="container-fluid">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Dirección</th>
              <th scope="col">Teléfono</th>
              <th scope="col">Email</th>
              <th scope="col">Observaciones</th>
              <th scope="col" colSpan="2">
                <button className="btn btn-primary my-1 float-right" onClick={() => setAddCustomer(true)}>Agregar</button>
              </th>
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