import React, { useEffect, useState } from 'react'
import { getDebtors } from '../../services/customers'

const Debtors = () => {
  const [debtors, setDebtors] = useState([])

  useEffect(() => {
    getDebtors()
      .then(debtors => setDebtors(debtors))
  }, [])

  return (
    <div>
      <table className="table">
        <thead>
          <th>Nombre</th>
          <th>Domicilio</th>
          <th>Teléfono</th>
          <th className="text-right">Debe</th>
        </thead>
        <tbody>
          {debtors
            .map(debtor =>
              <tr key={debtor.id}>
                <td>{debtor.name}</td>
                <td>{debtor.address}</td>
                <td>{debtor.phone}</td>
                <td className="text-right">${debtor.debt}</td>
              </tr>
            )}
        </tbody>

      </table>

    </div>
  )
}

export default Debtors