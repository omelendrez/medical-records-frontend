import React, { useEffect, useState } from 'react'
import './Home.css'
import { getProgrammedVisits } from '../services/consultations'
import ProgrammedVisits from '../components/consultations/ProgrammedVisits'

const Home = () => {
  const [consultations, setConsultations] = useState({ rows: [] })

  useEffect(() => {
    getProgrammedVisits()
      .then(consultations => setConsultations(consultations))
  }, [])

  const { rows } = consultations

  return (
    <div className="image">
      <div className="logo">
        <h1 className="display-4">
          Historias Clínicas
        </h1>
      </div>
      <div className="programmed-visits">
        {rows.length > 0 && <ProgrammedVisits consultations={rows} />}
      </div>
    </div>
  )
}

export default Home