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
      <div className="main-container">

        <div className="card customer">
          <div className="card-body">
            <h5 className="card-title">{customer.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{customer.address}</h6>
            <h6 className="card-subtitle mb-2 text-muted">{customer.phone}</h6>

            <p className="card-text observations">{customer.observations}</p>

            <div className="pets">
              <div className="pets-header">
                Pacientes
              </div>
              <ul className="list-group">
                {
                  customer.pets.map((pet, index) => {
                    return (
                      <li className="list-group-item" key={index}>
                        <Link
                          to={`/edit-paciente/${pet.id}`}
                          className="pet"
                        >{pet.name}</Link>
                      </li>
                    )
                  })
                }
              </ul>


              <div>
                <button
                  type="button"
                  className="btn btn-primary mt-4"
                  onClick={e => handleAddPet(e)}
                >Agregar</button>
              </div>
            </div>
            {
              !customer.pets.length && <div className="alert alert-warning my-3">No tiene mascotas</div>
            }
          </div>
          <div className="container-fluid my-4">
            <button
              type="button"
              className="btn btn-danger float-right"
              onClick={() => setBack(true)}
            >Volver</button>
          </div>
        </div>
        <div className="card consultations">
          test
        </div>
      </div>

    </>
  )
}

export default CustomerForm
