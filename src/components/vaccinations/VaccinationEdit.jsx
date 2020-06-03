import React, { useState, useEffect } from 'react'
import FormFooter from '../FormFooter'
import FormActions from '../FormActions'
import Checkbox from '../Checkbox'
import { getPet } from '../../services/pets'
import { Redirect } from 'react-router-dom'
import { saveVaccination, getVaccination } from '../../services/vaccinations'
import { vaccinesList } from '../../services/utils'
import './VaccinationForm.css'

const VaccinationEdit = props => {
  const [redirect, setRedirect] = useState('')
  const [error, setError] = useState('')
  const [pet, setPet] = useState({})
  const vaccinesState = vaccinesList.map(vaccine => {
    vaccine.checked = false
    return vaccine
  })

  const [form, setForm] = useState({
    id: '',
    customerId: '',
    petId: '',
    date: '',
    nextAppointment: '',
    amount: '',
    vaccinesState
  })


  useEffect(() => {
    getVaccination(props.match.params.vaccinationId)
      .then(vaccination => {
        setForm({ ...vaccination, vaccinesState })
        getPet(vaccination.petId)
          .then(pet => setPet(pet))
      })
  }, [props.match.params.vaccinationId])

  const handleChange = (e => {
    e.preventDefault()
    error && setError(false)
    let { id, value } = e.target
    setForm({
      ...form,
      [id]: value
    })
  })

  const handleCheckbox = (e => {
    error && setError(false)
    let { id } = e.target
    const { vaccinesState } = form
    const newState = vaccinesState.map(vaccine => {
      vaccine.checked = (vaccine.id === parseInt(id)) ? !vaccine.checked : vaccine.checked
      return vaccine
    })
    setForm({
      ...form,
      vaccinesState: newState
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
    setRedirect({ pathname: `${state.from}`, state: { current: 'vacunaciones' } })
  }

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      <div className="container-fluid">
        <div className="row">
          <div className="container">
            <h5 className="my-3">Editando Vacunacion de {pet.name}</h5>
            <form>

              <div className="form-container card p-3 mb-3">
                {vaccinesList.map(vaccine => <Checkbox
                  key={vaccine.id}
                  id={`chk${vaccine.id}`}
                  label={vaccine.name}
                  handleChange={handleCheckbox}
                  checked={form.vaccinesState.find(item => vaccine.id === item.id).checked}
                />)}
              </div>

              <FormFooter form={form} handleChange={handleChange} />

              <FormActions
                doSave={e => handleSave(e)}
                cancelSave={() => goBack()}
                error={error}
              />

            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default VaccinationEdit