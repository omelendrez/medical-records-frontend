import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { getCustomer } from '../../services/customers'
import { getPet } from '../../services/pets'
import './CustomerView.css'

const Consultation = ({ consultation }) => {
  const { date, diagnosis, treatment, nextConsultation, observations } = consultation
  return (
    <div className="card consultation">
      <div className="card-body">
        <h5 className="card-title">{date}</h5>
        <h6 className="card-subtitle mb-2">Diagnóstico: {diagnosis}</h6>
        <p className="card-text">{treatment}</p>
        <h6 className="card-subtitle mb-2">Próxima consulta: {nextConsultation}</h6>
        <p className="card-text">{observations}</p>
      </div>
    </div>
  )
}


const Consultations = ({ consultations, addConsultation }) => {

  return (
    <div className="consultations">
      <div className="text-right">
        <button
          type="button"
          className="btn btn-primary m-1"
          onClick={e => addConsultation(e)}
        >Agregar</button>
      </div>
      {consultations.map((consultation, index) => <Consultation key={index} consultation={consultation} />)}
    </div>
  )
}

const Pet = ({ pet }) => {
  const { name, type, breed, observations } = pet
  return (
    <div>
      <div>
        <h5 className="card-title">{name}</h5>
      </div>
      <div>{type}</div>
      <div>{breed}</div>
      <div>{observations}</div>
    </div>
  )
}

const Customer = ({ customer, pet, handleAddPet, selectPet, setBack }) => {
  const { name, address, phone, observations, pets } = customer
  return (
    <div className="card customer">
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{address}</h6>
        <h6 className="card-subtitle mb-2 text-muted">{phone}</h6>

        <p className="card-text observations">{observations}</p>

        {!pet.name && <div className="pets">
          <div className="pets-header">
            Pacientes
        </div>
          <ul className="list-group">
            {
              pets.map((pet, index) => {
                return (
                  <li
                    className="list-group-item"
                    key={index}
                    onClick={() => selectPet(pet)}
                  >
                    {pet.name}
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
        }
        {pet.name && <Pet pet={pet} />}
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

  )
}

const CustomerView = props => {
  const [back, setBack] = useState(false)
  const [addPet, setAddPet] = useState('')
  const [customer, setCustomer] = useState({ pets: [] })
  const [pet, setPet] = useState({})
  const [addConsultation, setAddConsultation] = useState('')

  useEffect(() => {
    getCustomer(props.match.params.id)
      .then(customer => setCustomer(customer))
  }, [props.match.params.id])

  const handleAddConsultation = e => {
    setAddConsultation(`/nueva-consulta/${pet.id}`)
  }

  const handleAddPet = e => {
    e.preventDefault()
    setAddPet(`/clientes/${customer.id}/nuevo-paciente`)
  }

  const selectPet = pet => {
    getPet(pet.id)
      .then(pet => setPet(pet))
  }
  const { consultations } = pet
  return (
    <>
      {addConsultation && <Redirect to={addConsultation} />}
      {addPet && <Redirect to={addPet} />}
      {back && <Redirect to="/clientes" />}
      <div className="main-container container-fluid">
        <Customer
          customer={customer}
          pet={pet}
          handleAddPet={handleAddPet}
          selectPet={selectPet}
          setBack={setBack}
        />

        {pet.name && <Consultations
          consultations={consultations}
          addConsultation={handleAddConsultation}
        />}

      </div>

    </>
  )
}

export default CustomerView
