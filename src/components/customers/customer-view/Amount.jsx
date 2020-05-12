import React from 'react'

const Amount = ({ text, value }) => {
  return <div className="amount-row mx-4">
    <div className="amount-label">{text}</div>
    <div className="amount">{value}</div>
  </div>
}

export default Amount
