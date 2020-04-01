import React from 'react'

const Customer = ({ data }) => {
  const { name, address, phone } = data

  return (
    <React.Fragment>
      <div>{name}</div>
      <div>{address}</div>
      <div>{phone}</div>
    </React.Fragment>
  )
}

export default Customer