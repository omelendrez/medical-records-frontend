import http from './api'

export const getCustomers = async filter => {
  const response = await http.get(`customers?filter=${filter}`)
  return response.data.customers
}

export const getInactiveCustomers = async () => {
  const response = await http.get(`customers/inactive`)
  return response.data.customers
}

export const getCustomer = async id => {
  const response = await http.get(`customers/${id}`)
  return response.data.customer
}

export const saveCustomer = customer => {
  return new Promise((resolve, reject) => {
    http.post('customers', customer)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => reject(error))
  })
}

export const deleteCustomer = customer => {
  return new Promise((resolve, reject) => {
    const { id } = customer
    http.delete(`customers/${id}`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => reject(error))
  })
}

export const restoreCustomer = customer => {
  return new Promise((resolve, reject) => {
    const { id } = customer
    http.put(`customers/${id}`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => reject(error))
  })
}