//Importo modale
import { useRef, useState } from "react"
import Modal from "./Modal"

//importo il createPortal per fare uscire la modale fuori dal dom
import { createPortal } from "react-dom"

export default function EditTaskModal({ show, onClose, task, onSave }) {

    // 💡 Importante:

    // Per attivare il submit del form, dobbiamo ottenere un riferimento diretto al form all'interno del componente. Creiamo una ref con useRef() e associamola al form.

    const formRef = useRef()

    // Questo ci permette di chiamare il metodo editFormRef.current.requestSubmit() quando l'utente clicca su "Salva" nella modale, simulando il comportamento di un normale submit.

    //input nome
    const [inputName, SetInputName] = useState("")

    //input descrizione 
    const [inputDescription, SetInputDescription] = useState("")

    //input stato
    const [inputState, SetInputState] = useState("")



    return show && createPortal(
        <Modal
            title="Modifica Task"
            content={
                <form ref={formRef} onSubmit={onSave}>
                    <input type="text" value={inputName} onChange={e => SetInputName(e.target.value)} />

                    <textarea name="description" value={inputDescription} onChange={e => SetInputDescription(e.target.value)}></textarea>

                    <select name="select" value={inputState} onChange={e => SetInputState(e.target.value)}>
                        <option value="">--Seleziona--</option>
                        <option value="To Do">To Do</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </select>
                    <button onClick={onClose}>Close</button>
                </form>}
            confirmText="Salva"
            onConfirm={() => formRef.current.requestSubmit()}
        />,
        document.body

    )
}

