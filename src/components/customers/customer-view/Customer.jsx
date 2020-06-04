import React from 'react'
import PetsList from './PetsList'
import Pet from './Pet'
import './Customer.css'

const Customer = ({ customer, pet, handleAddPet, loadPet, setBack, debt, addConsultation, current, addVaccination, addDeworming }) => {
  const { name, address, phone, email, observations, pets, statusId } = customer

  return (
    <>
      <div className="text-center d-none d-sm-block">
        <div className="card customer">
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{address}</h6>
            <h6 className="card-subtitle mb-2 text-muted">{phone}</h6>
            <h6 className="card-subtitle mb-2 text-muted">{email}</h6>
            {observations && <p className="card-text observations">{observations}</p>}
            {debt.balance > 0 && <p className="card-text text-danger">Debe ${debt.balance}</p>}
            <p className={`status ${statusId === 1 ? 'active' : 'inactive'}`}>{statusId === 1 ? 'Activo' : 'Inactivo'}</p>
          </div>
        </div>
        {pet.name &&
          <>
            <Pet pet={pet} />
            <div className="container button-container mt-3">
              {current === 'consultas' &&
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={e => addConsultation(e)}
                >+ Consulta</button>
              }
              {current === 'vacunaciones' &&
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={e => addVaccination(e)}
                >+ Vacunación</button>
              }
              {current === 'desparasitaciones' &&
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={e => addDeworming(e)}
                >+ Desparasitación</button>
              }
            </div>
          </>
        }

        <div className="container mt-3 button-container">
          <button
            type="button"
            className="btn btn-warning btn-block"
            onClick={() => setBack(true)}
          >Volver</button>
        </div>
      </div>
      <PetsList pet={pet} pets={pets} loadPet={loadPet} handleAddPet={handleAddPet} />
    </>
  )
}

export default Customer