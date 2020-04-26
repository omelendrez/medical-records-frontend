import React from 'react'

const Pagination = ({ pagination }) => {
  const { curPage, totRecords, limit } = pagination
  const totPages = Math.round(totRecords / limit)
  console.log(totRecords)
  return (
    <nav aria-label="...">
      <ul className="pagination">
        <li className="page-item disabled">
          <a className="page-link" href="a" tabIndex="-1" aria-disabled="true">
            {'<'}
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="a">
            1
          </a>
        </li>
        <li className="page-item active" aria-current="page">
          <a className="page-link" href="c">
            2
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="1">
            3
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="1">
            {'>'}
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination