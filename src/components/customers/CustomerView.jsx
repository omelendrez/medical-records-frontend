import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { getCustomer } from '../../services/customers'
import './CustomerView.css'

const CustomerForm = props => {
  const [back, setBack] = useState(false)
  const [addPet, setAddPet] = useState('')
  const [customer, setCustomer] = useState({ pets: [] })

  useEffect(() => {
    getCustomer(props.match.params.id)
      .then(customer => setCustomer(customer))
  }, [props.match.params.id])

  const handleAddPet = e => {
    e.preventDefault()
    setAddPet(`/clientes/${customer.id}/nuevo-paciente`)
  }

  return (
    <>
      {addPet && <Redirect to={addPet} />}
      {back && <Redirect to="/clientes" />}
      <div className="card customer" style={{ width: '40vw' }}>
        <div className="card-body">
          <h5 className="card-title">{customer.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{customer.address}</h6>
          <h6 className="card-subtitle mb-2 text-muted">{customer.phone}</h6>

          <p className="card-text observations">{customer.observations}</p>
          <div className="pets">

            {
              customer.pets.map((pet, index) => {
                return (
                  <Link
                    to="#"
                    key={index}
                    className="pet"
                  >{pet.name}</Link>
                )
              })
            }
            <div>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={e => handleAddPet(e)}
              >Agregar</button>
            </div>
          </div>
          {
            !customer.pets.length && <div className="alert alert-info">No tiene mascotas</div>
          }
        </div>
        <div className="container">
          <div>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => setBack(true)}
            >Volver</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CustomerForm
