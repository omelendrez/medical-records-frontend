import React from 'react'

const Confirm = ({ title, question, okButton, cancelButton, confirmDelete, cancelDelete }) => {

  return (
    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>{question}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => cancelDelete()}>{cancelButton}</button>
            <button type="button" className="btn btn-primary" onClick={() => confirmDelete()}>{okButton}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Confirm