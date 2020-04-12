import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { savePet, getPet } from '../../services/pets'

const PetForm = props => {
    const [back, setBack] = useState(false)
    const [error, setError] = useState('')

    const [form, setForm] = useState({})

    useEffect(() => {
        getPet(props.match.params.id)
            .then(pet => setForm(pet))
    }, [props.match.params.id])


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
        savePet(form)
            .then(() => setBack(true))
            .catch(err => {
                setError(err.response.data.error)
            })
    })

    return (
        <>
            {back && <Redirect to="/pacientes" />}
            <div className="container">
                <div className="row">
                    <div className="container col-8">
                        <h1 className="my-3">Editando Paciente</h1>
                        <form>
                            <div className="form-row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="name">Nombre del Paciente</label>
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
                                        <label htmlFor="type">Tipo</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="type"
                                            onChange={e => handleChange(e)}
                                            value={form.type}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="breed">Raza</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="breed"
                                            onChange={e => handleChange(e)}
                                            value={form.breed}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="sex">Sexo</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="sex"
                                            onChange={e => handleChange(e)}
                                            value={form.sex}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="weight">Peso</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="weight"
                                            onChange={e => handleChange(e)}
                                            value={form.weight}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="yearBorn">Año de Nacimiento</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="yearBorn"
                                            onChange={e => handleChange(e)}
                                            value={form.yearBorn}
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

export default PetForm
