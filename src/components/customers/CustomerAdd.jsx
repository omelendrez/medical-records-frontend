import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { saveCustomer } from '../../services/customers'

const CustomerForm = props => {
  const [back, setBack] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    observations: ''
  })

  const handleChange = (e => {
    e.preventDefault()
    setError(false)
    setForm({
      ...form,
      [e.target.id]: e.target.value
    })
  })


  const handleSave = (e => {
    e.preventDefault()
    saveCustomer(form)
      .then(() => setBack(true))
      .catch(err => {
        setError(err.response.data.error)
      })
  })

  return (
    <>
      {back && <Redirect to="/clientes" />}
      <div className="container">
        <div className="row">
          <div className="container col-8">
            <h1 className="my-3">Nuevo Cliente</h1>
            <form>
              <div className="form-row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="name">Nombre y apellido</label>
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
                    <label htmlFor="address">Domicilio</label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      onChange={e => handleChange(e)}
                      value={form.address}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="phone">Teléfono</label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      onChange={e => handleChange(e)}
                      value={form.phone}
                      required
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      onChange={e => handleChange(e)}
                      value={form.email}
                      required
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

export default CustomerForm
