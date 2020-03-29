import React from 'react'

import { customers } from '../data/customers.json'

const Customers = () => {
  const { rows } = customers
  return rows.map(record => <Customer key={record.id} customer={record} />)
}

const Customer = ({ customer }) => {
  const { name, address } = customer

  return (
    <React.Fragment>
      <div>{name}</div>
      <div>{address}</div>
    </React.Fragment>
  )
}


export default Customers