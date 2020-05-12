import React from 'react'

const PetsList = ({ pet, pets, loadPet, handleAddPet }) => {

  return (
    !pet.name &&
    <div className="pets mt-2">
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
                <button className={`btn btn-${pet.statusId === 1 ? 'info' : 'danger'} btn-block`}>
                  {`${pet.name} (${pet.statusId === 1 ? 'activo' : 'inactivo'})`}
                </button>
              </li>
            )
          })
        }
      </ul>
      {
        !pets.length && <div className="alert alert-warning my-3">No tiene mascotas</div>
      }
      <div>
        <button
          type="button"
          className="btn btn-primary mt-4 float-right"
          onClick={e => handleAddPet(e)}
        >Agregar</button>
      </div>

    </div >

  )
}

export default PetsList