import React, { useState } from 'react'
import { getApointmentFromDays } from '../services/utils'

const FormFooter = ({ form, handleChange }) => {
  const [days, setDays] = useState('')

  const handleDaysChange = e => {
    setDays(e.target.value)
    const event = {
      target: {
        name: 'nextAppointment',
        value: getApointmentFromDays(e.target.value),
      },
      preventDefault: () => { }
    }
    handleChange(event)
  }

  return (
    <div>
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
              <label htmlFor="days">Días</label>
              <input
                type="number"
                className="form-control"
                id="days"
                onChange={e => handleDaysChange(e)}
                value={days}
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
        </div>
      </div>
    </div>
  )
}

export default FormFooter