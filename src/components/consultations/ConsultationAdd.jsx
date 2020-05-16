import React, { useState, useEffect } from 'react'
import Pet from '../customers/customer-view/Pet'
import { getPet } from '../../services/pets'
import { Redirect } from 'react-router-dom'
import { saveConsultation } from '../../services/consultations'
import { paymentMethods } from '../../services/utils'

const ConsultationForm = props => {
  const [back, setBack] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    customerId: props.match.params.customerId,
    petId: props.match.params.petId,
    date: '',
    clinicalExamination: '',
    diagnosis: '',
    treatment: '',
    nextConsultation: '',
    observations: '',
    amount: '0.00',
    paymentMethod: '',
    paid: '0.00'
  })

  const [pet, setPet] = useState({})

  useEffect(() => {
    getPet(props.match.params.petId)
      .then(pet => setPet(pet))
  }, [props.match.params.petId])

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
      <div className="container-fluid">
        <div className="row">
          <div className="container col-2 text-center mt-2">
            <Pet pet={pet} />
          </div>
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
                    <label htmlFor="clinicalExamination">Examen Clinico</label>
                    <input
                      type="text"
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
                      rows="1"
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
                onClick={() => setBack(true)}
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