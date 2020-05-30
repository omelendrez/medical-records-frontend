import React from 'react'

const TableActions = props => {

  const { data, actionDelete, actionEdit } = props

  return (
    <>
      <td style={{ width: '120px' }}>
        <button
          className="btn btn-danger"
          onClick={() => actionDelete(data)}
        >Eliminar</button>
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