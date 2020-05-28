import React, { useState, useEffect } from 'react'
import FormFooter from '../FormFooter'
import { getPet } from '../../services/pets'
import { Redirect } from 'react-router-dom'
import { saveVaccination } from '../../services/vaccinations'
import { paymentMethods, vaccines } from '../../services/utils'
import './VaccinationForm.css'

const VaccinationAdd = props => {
  const [redirect, setRedirect] = useState('')
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    customerId: props.match.params.customerId,
    petId: props.match.params.petId,
    date: '',
    vaccination: '',
    clinicalExamination: '',
    diagnosis: '',
    treatment: '',
    nextAppointment: '',
    amount: '0.00',
    paymentMethod: '',
    paid: '0.00',
    vaccines: []
  })

  const [pet, setPet] = useState({})

  useEffect(() => {
    getPet(props.match.params.petId)
      .then(pet => setPet(pet))
  }, [props.match.params.petId])

  const handleChange = (e => {
    e.preventDefault()
    error && setError(false)
    console.log(e.target.value)
    setForm({
      ...form,
      [e.target.id]: e.target.value
    })
  })

  const handleSave = (e => {
    e.preventDefault()
    saveVaccination(form)
      .then(() => goBack())
      .catch(err => {
        setError(err.response.data.error)
      })
  })

  const goBack = () => {
    const { state } = props.location
    setRedirect(state.from)
  }

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      <div className="container-fluid">
        <div className="row">
          <div className="container">
            <h5 className="my-3">Agregando Vacunacion para {pet.name}</h5>
            <form>

              <div className="form-container card p-3 mb-3">
                <div className="form-group row">
                  <label htmlFor="vaccination" className="col-sm-2 col-form-label">Vacunacion</label>
                  <div className="col-sm-10">
                    <textarea
                      className="form-control"
                      id="vaccination"
                      onChange={e => handleChange(e)}
                      value={form.vaccination}
                      rows="2"
                    />
                  </div>
                </div>
              </div>
              <div className="form-container card p-3 mb-3">
                <div className="form-group row">
                  <label htmlFor="vaccines" className="col-sm-2 col-form-label">Vacunas</label>
                  <div className="col-sm-10">
                    <select
                      multiple
                      className="form-control"
                      id="vaccines"
                      onChange={e => handleChange(e)}
                      value={form.vaccines}
                    >
                      {
                        vaccines.map(vaccine => <option key={vaccine.id} value={vaccine.id} > {vaccine.name}</option>)
                      }
                    </select>
                  </div>
                </div>
              </div>
              <div className="record card p-3 mb-3">
                <div className="form-row">
                  <div className="col-12 col-sm">
                    <div className="form-group">
                      <label htmlFor="date">Fecha consulta</label>
                      <input
                        type="date"
                        className="form-control"
                        id="date"
                        onChange={e => handleChange(e)}
                        value={form.date}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm">
                    <div className="form-group">
                      <label htmlFor="nextAppointment">Próximo turno</label>
                      <input
                        type="date"
                        className="form-control"
                        id="nextAppointment"
                        onChange={e => handleChange(e)}
                        value={form.nextAppointment || ''}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm">
                    <div className="form-group">
                      <label htmlFor="treatment">Valor consulta</label>
                      <input
                        type="text"
                        className="form-control text-right"
                        id="amount"
                        onChange={e => handleChange(e)}
                        value={parseFloat(form.amount).toFixed(2)}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm">
                    <div className="form-group">
                      <label htmlFor="treatment">Forma de pago</label>
                      <select className="form-control"
                        id="paymentMethod"
                        onChange={e => handleChange(e)}
                        value={form.paymentMethod}
                      >
                        {
                          paymentMethods.map(method => <option key={method.id} value={method.id} > {method.name}</option>)
                        }
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-sm">
                    <div className="form-group">
                      <label htmlFor="treatment">Pagado</label>
                      <input
                        type="text"
                        className="form-control text-right"
                        id="paid"
                        onChange={e => handleChange(e)}
                        value={parseFloat(form.paid).toFixed(2)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <FormFooter form={form} handleChange={handleChange} />

              <button
                type="submit"
                className="btn btn-primary"
                onClick={e => handleSave(e)}
              >Guardar</button>

              <button
                type="button"
                className="btn btn-danger float-right"
                onClick={() => goBack()}
              >Volver</button>

              {error && <div className="alert alert-danger mt-3" role="alert">{error}</div>}

            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default VaccinationAdd