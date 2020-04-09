import http from './api'

export const getConsultations = async filter => {
  const response = await http.get(`consultations?filter=${filter}`)
  return response.data.consultations
}

export const saveConsultation = consultation => {
  return new Promise((resolve, reject) => {
    http.post('consultations', consultation)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => reject(error))
  })
}

export const deleteConsultation = consultation => {
  return new Promise((resolve, reject) => {
    const { id } = consultation
    http.delete(`consultations/${id}`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => reject(error))
  })
}