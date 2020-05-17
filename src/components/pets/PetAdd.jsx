import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { savePet } from '../../services/pets'
import { sexList, getDateFromDays } from '../../services/utils'

const PetForm = props => {
  const [back, setBack] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    customerId: props.match.params.id,
    name: '',
    type: '',
    sex: '',
    breed: '',
    observations: '',
    days: ''
  })

  const handleChange = (e => {
    e.preventDefault()
    error && setError(false)
    setForm({
      ...form,
      [e.target.id]: e.target.value
    })
  })

  const handleDaysChange = e => {
    e.preventDefault()
    const yearBorn = getDateFromDays(e.target.value)
    setForm({
      ...form,
      yearBorn
    })
  }

  const handleSave = (e => {
    e.preventDefault()
    savePet(form)
      .then(() => setBack(true))
      .catch(err => {
        setError(err.response.data.error)
      })
  })

  return (
    <>
      {back && <Redirect to={`/clientes/${props.match.params.id}`} />}
      <div
        className="container">
        <div className="row">
          <div className="container col-8">
            <h1 className="my-3">Nuevo Paciente</h1>
            <form>
              <div className="form-row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="name">Nombre del Paciente</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      onChange={e => handleChange(e)}
                      value={form.name}
                      required
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="type">Tipo</label>
                    <input
                      type="text"
                      className="form-control"
                      id="type"
                      onChange={e => handleChange(e)}
                      value={form.type}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="breed">Raza</label>
                    <input
                      type="text"
                      className="form-control"
                      id="breed"
                      onChange={e => handleChange(e)}
                      value={form.breed}
                      required
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="sex">Sexo</label>
                    <select
                      className="form-control"
                      id="sex"
                      onChange={e => handleChange(e)}
                      value={form.sex}
                    >
                      {sexList.map(sex => {
                        return (
                          <option key={sex.id} value={sex.id}>
                            {sex.name}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="col-5">
                  <div className="form-group">
                    <label htmlFor="weight">Peso</label>
                    <input
                      type="text"
                      className="form-control"
                      id="weight"
                      onChange={e => handleChange(e)}
                      value={form.weight}
                      required
                    />
                  </div>
                </div>
                <div className="col-5">
                  <div className="form-group">
                    <label htmlFor="yearBorn">Nacimiento</label>
                    <input
                      type="date"
                      className="form-control"
                      id="yearBorn"
                      onChange={e => handleChange(e)}
                      value={form.yearBorn}
                      required
                    />
                  </div>
                </div>
                <div className="col-2">
                  <div className="form-group">
                    <label htmlFor="days">Días</label>
                    <input
                      type="number"
                      id="days"
                      className="form-control"
                      onChange={e => handleDaysChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="observations">Observaciones</label>
                <textarea
                  className="form-control"
                  id="observations"
                  onChange={e => handleChange(e)}
                  value={form.observations}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                onClick={e => handleSave(e)}
              >Guardar</button>

              <button
                type="button"
                className="btn btn-danger float-right"
                onClick={() => setBack(true)}
              >Volver</button>

              {error && <div className="alert alert-danger mt-3" role="alert">{error}</div>}

            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default PetForm
