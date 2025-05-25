//importo il createPortal per fare uscire la modale fuori dal dom
import { createPortal } from "react-dom"

export default function Modal({
    title, 
    content, 
    show, 
    onClose, 
    onConfirm, 
    confirmText
}) 

{
  return show &&  createPortal(
    <div className="modal-container">
        <div className="modal">
            <h2>{title}</h2>
            <p>{content}</p>
            <button onClick={onClose}>Close</button>
            <button onClick={onConfirm}>Confirm</button>
        </div>
    </div>,

    document.body
  )
}
