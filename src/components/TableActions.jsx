import React from 'react'
import { readOnly } from '../services/utils'

const TableActions = ({ data, actionDelete, actionEdit }) => {
  if (readOnly()) return null
  return (
    <>
      <td style={{ width: '120px' }}>
        <button
          className="btn btn-danger"
          onClick={() => actionDelete(data)}
        >Desactivar</button>
      </td>
      <td style={{ width: '120px' }}>
        <button
          className="btn btn-info"
          onClick={() => actionEdit(data)}
        >Modificar</button>
      </td>
    </>
  )
}

export default TableActions