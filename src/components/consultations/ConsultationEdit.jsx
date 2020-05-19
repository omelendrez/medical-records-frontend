import React, { useState, useEffect } from 'react'
import { getPet } from '../../services/pets'
import { Redirect } from 'react-router-dom'
import { saveConsultation, getConsultation } from '../../services/consultations'
import { paymentMethods } from '../../services/utils'
import './ConsultationForm.css'

const ConsultationForm = props => {
  const [redirect, setRedirect] = useState('')
  const [error, setError] = useState('')
  const [tab, setTab] = useState('consultation')

  const [form, setForm] = useState({
    id: '',
    customerId: '',
    petId: '',
    date: '',
    anamnesis: '',
    diagnosis: '',
    treatment: '',
    nextConsultation: '',
    amount: '',
    paymentMethod: '',
    paid: '',
    deworming: '',
    vaccination: ''
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

  const handleChangeTab = (e, tab) => {
    e.preventDefault()
    setTab(tab)
  }

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      <div className="container-fluid">
        <div className="row">
          <div className="container">
            <h5 className="my-3">Editando Historia Clínica de {pet.name}</h5>
            <form>
              {/* Tab headers */}
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a
                    className={`nav-link ${tab === 'consultation' ? 'active' : ''}`}
                    href={() => { }}
                    onClick={e => handleChangeTab(e, 'consultation')}
                  >Consulta</a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${tab === 'vaccination' ? 'active' : ''}`}
                    onClick={e => handleChangeTab(e, 'vaccination')}
                    href={() => { }}
                  >Vacunación</a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${tab === 'deworming' ? 'active' : ''}`}
                    onClick={e => handleChangeTab(e, 'deworming')}
                    href={() => { }}
                  >Desparasitación</a>
                </li>
              </ul>

              {/* Tab bodies */}

              <div className="form-container">
                {tab === 'consultation' &&
                  <>
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
                  </>
                }

                {tab === 'vaccination' &&
                  <div className="form-row">
                    <div className="col">
                      <div className="form-group">
                        <textarea
                          placeholder="Vacunación"
                          className="form-control"
                          id="vaccination"
                          onChange={e => handleChange(e)}
                          value={form.vaccination}
                          rows="3"
                        />
                      </div>
                    </div>
                  </div>
                }

                {tab === 'deworming' &&
                  <div className="form-row">
                    <div className="col">
                      <div className="form-group">
                        <textarea
                          placeholder="Desparasitación"
                          className="form-control"
                          id="deworming"
                          onChange={e => handleChange(e)}
                          value={form.deworming}
                          rows="3"
                        />
                      </div>
                    </div>
                  </div>
                }
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
                      <label htmlFor="nextConsultation">Proxima consulta</label>
                      <input
                        type="date"
                        className="form-control"
                        id="nextConsultation"
                        onChange={e => handleChange(e)}
                        value={form.nextConsultation || ''}
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
