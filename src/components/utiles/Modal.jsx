import React from "react";

const Modal = ({display, children, onClose, onSave, onDelete, tittle}) => {
  return (
    <div className={`bg-dark position-fixed vw-100 vh-100 top-0 start-0  d-${display} bg-opacity-50`}>
      <div className="modal-dialog vw-100 p-5 " style={{minWidth: 800}}>
        <div className="modal-content p-5 bg-white">
          <div className="modal-header">
            <h5 className="modal-title">{tittle}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            />
          </div>
          <div className="modal-body">
            {children}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={onClose}
            >
              Cerrar
            </button>
            <button type="button" className="btn btn-primary" onClick={onSave}>
              Guardar 
            </button>
            <button type="button" className="btn bg-danger text-white" onClick={onDelete}>
              Borrar 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
