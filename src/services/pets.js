import http from './api'

export const getPets = async filter => {
    const response = await http.get(`pets?filter=${filter}`)
    return response.data.pets
}

export const getPet = async id => {
    const response = await http.get(`pets/${id}`)
    return response.data.pet
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