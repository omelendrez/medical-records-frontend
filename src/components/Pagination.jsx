import React from 'react'

const Pagination = ({ pagination }) => {
  const { curPage, totRecords, limit } = pagination
  const totPages = Math.round(totRecords / limit)

  const canGoBackward = curPage > 1
  const canGoForward = curPage < totPages

  console.log(pagination)

  return (
    <nav aria-label="...">
      <ul className="pagination">
        <li className={`page-item ${canGoBackward ? '' : 'disabled'}`}>
          <button className="page-link">
            {'<<'}
          </button>
        </li>
        <li className={`page-item ${canGoBackward ? '' : 'disabled'}`}>
          <button className="page-link">
            {'<'}
          </button>
        </li>
        <li className="page-item active">
          <button className="page-link" >
            {curPage}
          </button>
        </li>
        <li className={`page-item ${canGoForward ? '' : 'disabled'}`}>
          <button className="page-link" >
            {'>'}
          </button>
        </li>
        <li className={`page-item ${canGoForward ? '' : 'disabled'}`}>
          <button className="page-link" >
            {'>>'}
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination