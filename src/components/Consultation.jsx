import React from 'react'

const Consultation = ({ data, indice }) => {

  const { date, diagnosis, treatment, nextConsultation } = data

  return (
    <tr>
      <td>{indice}</td>
      <td>{date}</td>
      <td>{diagnosis}</td>
      <td>{treatment}</td>
      <td>{nextConsultation}</td>
    </tr>
  )
}

export default Consultation