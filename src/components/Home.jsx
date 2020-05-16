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

  return (
    <div className="image">
      <div className="logo">
        <h1 className="display-4">
          Historias Clínicas
        </h1>
      </div>
      {consultations.rows && <ProgrammedVisits consultations={consultations} />}
    </div>
  )
}

export default Home