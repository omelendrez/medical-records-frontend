import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Confirm from '../Confirm'
import { getCustomer } from '../../services/customers'
import { getPet } from '../../services/pets'
import { deleteConsultation } from '../../services/consultations'
import './CustomerView.css'

const Consultation = ({ consultation, editConsultation, deleteConsultation }) => {
  const { id, date, diagnosis, treatment, nextConsultation, observations } = consultation
  return (
    <div className="card consultation">
      <div className="card-body">
        <h5 className="card-title">{date}</h5>
        <h6 className="card-subtitle mb-2">Diagnóstico: {diagnosis}</h6>
        <p className="card-text">{treatment}</p>
        {nextConsultation && <h6 className="card-subtitle mb-2">Próxima consulta: {nextConsultation}</h6>}
        {observations && <p className="card-text">{observations}</p>}
        <div>
          <button
            type="button"
            className="btn btn-info m-1"
            onClick={() => editConsultation(id)}
          >Modificar</button>
          <button
            type="button"
            className="btn btn-danger m-1 float-right"
            onClick={() => deleteConsultation(consultation)}
          >Eliminar</button>
        </div>
      </div>
    </div>
  )
}

const Consultations = ({ consultations, addConsultation, editConsultation, deleteConsultation }) => {

  return (
    <div className="consultations">
      <div className="text-right">
        <button
          type="button"
          className="btn btn-primary m-1"
          onClick={e => addConsultation(e)}
        >Agregar</button>
      </div>
      <div className="consultations-list overflow-auto">
        {consultations.map((consultation, index) => <Consultation
          key={index}
          consultation={consultation}
          editConsultation={editConsultation}
          deleteConsultation={deleteConsultation}
        />)}
      </div>
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

const Customer = ({ customer, pet, handleAddPet, loadPet, setBack }) => {
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
                    onClick={() => loadPet(pet)}
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
          className="btn btn-warning float-right"
          onClick={() => setBack(true)}
        >Volver</button>
      </div>
    </div>

  )
}

const CustomerView = props => {
  const [redirect, setRedirect] = useState('')
  const [customer, setCustomer] = useState({ pets: [] })
  const [pet, setPet] = useState({})
  const [selected, setSelected] = useState({})
  const [showConfirm, setShowConfirm] = useState(false)

  const setBack = () => {
    props.history.goBack()
  }

  const loadPet = pet => {
    setRedirect(`/clientes/${customer.id}/${pet.id}`)
  }

  useEffect(() => {
    getCustomer(props.match.params.id)
      .then(customer => {
        setCustomer(customer)
        const pet = { id: props.match.params.petId }
        if (props.match.params.petId) {
          selectPet(pet)
        }
      })
  }, [props.match.params.id, props.match.params.petId])

  const handleAddConsultation = e => {
    setRedirect(`/nueva-consulta/${customer.id}/${pet.id}`)
  }

  const handleEditConsultation = id => {
    setRedirect(`/edit-consulta/${id}`)
  }

  const handleDeleteConsultation = consultation => {
    setSelected(consultation)
    setShowConfirm(true)
  }
  const confirmDelete = () => {
    deleteConsultation(selected)
      .then(() => getPet(pet.id)
        .then(pet => {
          setPet(pet)
          setShowConfirm(false)
        }))
  }

  const handleAddPet = e => {
    e.preventDefault()
    setRedirect(`/nuevo-paciente/${customer.id}`)
  }

  const selectPet = pet => {
    getPet(pet.id)
      .then(pet => setPet(pet))
  }
  const { consultations } = pet
  return (
    <>
      {showConfirm &&
        <Confirm
          title="Eliminando consulta"
          question={`Desea eliminar consulta del ${selected.date} del paciente ${pet.name}?`}
          okButton="Eliminar"
          cancelButton="Cancelar"
          cancelDelete={() => setShowConfirm(false)}
          confirmDelete={() => confirmDelete()}
        />
      }
      {redirect && <Redirect to={redirect} />}
      <div className="main-container container-fluid">
        <Customer
          customer={customer}
          pet={pet}
          handleAddPet={handleAddPet}
          loadPet={loadPet}
          setBack={setBack}
        />

        {pet.name && <Consultations
          consultations={consultations}
          addConsultation={handleAddConsultation}
          editConsultation={handleEditConsultation}
          deleteConsultation={handleDeleteConsultation}
        />}
      </div>

    </>
  )
}

export default CustomerView
