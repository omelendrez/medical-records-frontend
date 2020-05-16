import React, { useEffect, useState } from 'react'
import './Home.css'
import { getProgrammedVisits } from '../services/consultations'
import ProgrammedVisits from '../components/consultations/ProgrammedVisits'

const Home = () => {
  const [consultations, setConsultations] = useState([])

  useEffect(() => {
    getProgrammedVisits()
      .then(consultations => setConsultations(consultations.rows))
  }, [])

  return (
    <div className="image">
      <div className="logo">
        <h1 className="display-4">
          Historias Clínicas
        </h1>
      </div>
      <div className="programmed-visits">

        {consultations && <ProgrammedVisits consultations={consultations} />}
      </div>
    </div>
  )
}

export default Home