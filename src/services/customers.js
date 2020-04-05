import http from './api'

export const getCustomers = async () => {
  const response = await http.get('customers')
  return response.data.customers
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