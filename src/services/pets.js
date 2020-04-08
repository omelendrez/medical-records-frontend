import http from './api'

export const getPets = async filter => {
    const response = await http.get(`pets?filer=${filter}`)
    return response.data.pets
}

export const savePet = pet => {
    return new Promise((resolve, reject) => {
        http.post('pets', pet)
            .then(response => {
                resolve(response.data)
            })
            .catch(error => reject(error))
    })
}

export const deletePet = pet => {
    return new Promise((resolve, reject) => {
        const { id } = pet
        http.delete(`pets/${id}`)
            .then(response => {
                resolve(response.data)
            })
            .catch(error => reject(error))
    })
}