import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { saveConsultation } from '../../services/consultations'
import { paymentMethods } from '../../services/utils'

const ConsultationForm = props => {
  const [back, setBack] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    petId: props.match.params.petId,
    date: '',
    diagnosis: '',
    treatment: '',
    nextConsultation: '',
    observations: '',
    amount: '',
    paymentMethod: '',
    paid: ''
  })

  const handleChange = (e => {
    e.preventDefault()
    error && setError(false)
    setForm({
      ...form,
      [e.target.id]: e.target.value
    })
  })

  const handleSave = (e => {
    e.preventDefault()
    saveConsultation(form)
      .then(() => setBack(true))
      .catch(err => {
        setError(err.response.data.error)
      })
  })

  return (
    <>
      {back && <Redirect to={`/clientes/${props.match.params.customerId}/${props.match.params.petId}`} />}
      <div className="container">
        <div className="row">
          <div className="container col-8">
            <h1 className="my-3">Nueva Consulta</h1>
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
                    <label htmlFor="nextConsultation">Próxima consulta</label>
                    <input
                      type="date"
                      className="form-control"
                      id="nextConsultation"
                      onChange={e => handleChange(e)}
                      value={form.nextConsultation}
                    />
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="diagnosis">Diagnostico</label>
                    <input
                      type="text"
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
                    <label htmlFor="treatment">Tratamiento</label>
                    <textarea
                      className="form-control"
                      id="treatment"
                      onChange={e => handleChange(e)}
                      value={form.treatment}
                      required
                      rows="2"
                    />
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="observations">Observaciones</label>
                    <textarea
                      className="form-control"
                      id="observations"
                      onChange={e => handleChange(e)}
                      value={form.observations}
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
                        paymentMethods.map(method => <option value={method.id} > {method.name}</option>)
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

export default ConsultationForm