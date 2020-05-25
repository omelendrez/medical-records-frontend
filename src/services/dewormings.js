import http from './api'

export const getDewormings = async pagination => {
  const { filter, limit, curPage } = pagination
  const response = await http.get(`dewormings?filter=${filter}&page=${curPage}&limit=${limit}`)
  return response.data.dewormings
}

export const getInactiveDewormings = async pagination => {
  const { filter, limit, curPage } = pagination
  const response = await http.get(`dewormings/inactive?filter=${filter}&page=${curPage}&limit=${limit}`)
  return response.data.dewormings
}

export const getProgrammedVisits = async () => {
  const response = await http.get(`dewormings/programmed-visits`)
  return response.data.dewormings
}

export const getDewormingsByPet = async id => {
  const response = await http.get(`dewormings/by-pet/${id}`)
  return response.data.dewormings
}

export const saveDeworming = deworming => {
  return new Promise((resolve, reject) => {
    http.post('dewormings', deworming)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => reject(error))
  })
}

export const getDeworming = async id => {
  const response = await http.get(`dewormings/${id}`)
  return response.data.deworming
}

export const deleteDeworming = deworming => {
  return new Promise((resolve, reject) => {
    const { id } = deworming
    http.delete(`dewormings/${id}`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => reject(error))
  })
}

export const restoreDeworming = deworming => {
  return new Promise((resolve, reject) => {
    const { id } = deworming
    http.put(`dewormings/${id}`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => reject(error))
  })
}