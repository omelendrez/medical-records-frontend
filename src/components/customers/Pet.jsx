import React from 'react'

const Pet = ({ pet }) => {

  const { name, type, breed, observations } = pet

  return (
    <div>
      <div>
        <h5 className="card-title">{pet.name}</h5>
      </div>
      <div>
        {type}
      </div>
      <div>
        {breed}
      </div>
      <div>
        {observations}
      </div>
    </div>
  )
}

export default Pet