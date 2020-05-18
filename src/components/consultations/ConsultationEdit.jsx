import React, { useState, useEffect } from 'react'
import { getPet } from '../../services/pets'
import { Redirect } from 'react-router-dom'
import { saveConsultation, getConsultation } from '../../services/consultations'
import { paymentMethods } from '../../services/utils'

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
    nextConsultation: '',
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
          <div className="container col-8">
            <h4 className="my-3">Editando Historia Clínica de {pet.name}</h4>
            <form>
              <div className="form-row">
                <div className="col">
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
                <div className="col">
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
              </div>
              <div className="form-row">
                <div className="col">
                  <div className="form-group">
                    <input
                      placeholder="Anamnesis"
                      className="form-control"
                      id="anamnesis"
                      onChange={e => handleChange(e)}
                      value={form.anamnesis}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="col">
                  <div className="form-group">
                    <input
                      placeholder="Examen Clínico"
                      className="form-control"
                      id="clinicalExamination"
                      onChange={e => handleChange(e)}
                      value={form.clinicalExamination}
                      required
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
                      required
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
                      required
                      rows="1"
                    />
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="treatment">Valor consulta</label>
                    <input
                      type="text"
                      className="form-control"
                      id="amount"
                      onChange={e => handleChange(e)}
                      value={form.amount}
                    />
                  </div>
                </div>
                <div className="col">
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
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="treatment">Pagado</label>
                    <input
                      type="text"
                      className="form-control"
                      id="paid"
                      onChange={e => handleChange(e)}
                      value={form.paid}
                    />
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
          <div className="col-2 container"></div>
        </div>
      </div>
    </>
  )
}

export default ConsultationForm
