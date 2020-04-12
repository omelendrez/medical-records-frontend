import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { getCustomer } from '../../services/customers'
import './CustomerView.css'

const CustomerForm = props => {
  const [back, setBack] = useState(false)
  const [customer, setCustomer] = useState({ pets: [] })

  useEffect(() => {
    getCustomer(props.match.params.id)
      .then(customer => setCustomer(customer))
  }, [props.match.params.id])

  return (
    <>
      {back && <Redirect to="/clientes" />}
      <div className="card" style={{ width: '18rem' }}>
        <div className="card-body">
          <h5 className="card-title">{customer.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{customer.address}</h6>
          <h6 className="card-subtitle mb-2 text-muted">{customer.phone}</h6>
          <p className="card-text">{customer.observations}</p>
          {
            customer.pets.map((pet, index) => {
              return (
                <Link
                  to="#"
                  key={index}
                  className="card-link"
                >{pet.name}</Link>
              )
            })
          }
          {
            !customer.pets.length && <div className="alert alert-info">No tiene mascotas</div>
          }
        </div>
        <button
          type="button"
          className="btn btn-danger float-right"
          onClick={() => setBack(true)}
        >Volver</button>
      </div>
    </>
  )
}

export default CustomerForm
