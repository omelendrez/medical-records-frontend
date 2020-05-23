import React, { useState, useEffect } from 'react'
import { getPet } from '../../services/pets'
import { Redirect } from 'react-router-dom'
import { saveConsultation, getConsultation } from '../../services/consultations'
import { paymentMethods } from '../../services/utils'
import './ConsultationForm.css'

const ConsultationForm = props => {
  const [redirect, setRedirect] = useState('')
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    id: '',
    customerId: '',
    petId: '',
    date: '',
    anamnesis: '',
    diagnosis: '',
    treatment: '',
    nextAppointment: '',
    amount: '',
    paymentMethod: '',
    paid: ''
  })

  const [pet, setPet] = useState({})

  useEffect(() => {
    getConsultation(props.match.params.consultationId)
      .then(consultation => {
        setForm(consultation)
        getPet(consultation.petId)
          .then(pet => setPet(pet))
      })
  }, [props.match.params.consultationId])


  const handleChange = (e => {
    e.preventDefault()
    error && setError(false)
    let { id, value } = e.target
    setForm({
      ...form,
      [id]: value
    })
  })

  const handleSave = (e => {
    e.preventDefault()
    saveConsultation(form)
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
            <h5 className="my-3">Editando Historia Clínica de {pet.name}</h5>
            <form>

              <div className="form-container">
                <div className="form-row">
                  <div className="col">
                    <div className="form-group">
                      <textarea
                        placeholder="Anamnesis"
                        className="form-control"
                        id="anamnesis"
                        onChange={e => handleChange(e)}
                        value={form.anamnesis}
                        rows="1"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="col">
                    <div className="form-group">
                      <textarea
                        placeholder="Examen Clínico"
                        className="form-control"
                        id="clinicalExamination"
                        onChange={e => handleChange(e)}
                        value={form.clinicalExamination}
                        rows="1"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="col">
                    <div className="form-group">
                      <input
                        placeholder="Diagnóstico"
                        className="form-control"
                        id="diagnosis"
                        onChange={e => handleChange(e)}
                        value={form.diagnosis}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="col">
                    <div className="form-group">
                      <textarea
                        placeholder="Tratamiento"
                        className="form-control"
                        id="treatment"
                        onChange={e => handleChange(e)}
                        value={form.treatment}
                        rows="1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="record">
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
                      <label htmlFor="nextAppointment">Proxima consulta</label>
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

export default ConsultationForm
