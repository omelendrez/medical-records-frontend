import React from 'react'
import Customer from './Customer'

import { customers } from '../data/customers.json'

const Customers = () => {
  const { rows } = customers

  return rows.map(record => <Customer key={record.id} data={record} />)
}

export default Customers