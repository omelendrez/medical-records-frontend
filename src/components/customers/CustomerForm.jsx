import React from 'react'

const CustomerForm = props => {
  return (
    <div className="row mt-5">
      <div className="container col-4">
        <form>

          <div className="form-group">
            <label for="name">Nombre</label>
            <input type="text" className="form-control" id="name" />
          </div>

          <div className="form-group">
            <label for="address">Dirección</label>
            <input type="text" className="form-control" id="address" />
          </div>

          <div className="form-group">
            <label for="phone">Teléfono</label>
            <input type="text" className="form-control" id="phone" />
          </div>

          <div className="form-group">
            <label for="email">Email</label>
            <input type="email" className="form-control" id="email" />
          </div>

          <div className="form-group">
            <label for="observations">Observaciones</label>
            <textarea className="form-control" rows="3" id="observations" />
          </div>

          <button type="submit" className="btn btn-primary">Enviar</button>
          <button type="button" className="btn btn-danger float-right">Volver</button>

        </form>
      </div>
    </div>
  )
}

export default CustomerForm
