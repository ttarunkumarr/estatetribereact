import React, { useEffect } from "react";
import "./Modal.css"; 

function Modal({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); 

    return () => clearTimeout(timer); 
  }, [onClose]);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="message">{message}</div>
      </div>
    </div>
  );
}

export default Modal;
