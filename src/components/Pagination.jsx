import React from 'react'

const Pagination = ({ pagination, changePage }) => {
  const { curPage, totRecords, limit } = pagination
  const totPages = Math.ceil(totRecords / limit)

  //const canGoBackward = curPage > 1
  //const canGoForward = curPage < totPages

  const pages = []
  for (let i = 1; i <= totPages; i++) {
    pages.push(i)
  }

  const handleChangePage = page => {
    changePage(page)
  }

  return (
    <nav aria-label="...">
      <ul className="pagination pagination-sm">
        {pages.map(page => (
          <li className={`page-item ${page === curPage ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handleChangePage(page)}>
              {page}
            </button>
          </li>
        ))}
      </ul >
    </nav >
  )
}

export default Pagination