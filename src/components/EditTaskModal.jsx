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
    const [inputName, SetInputName] = useState(task.title)

    //input descrizione 
    const [inputDescription, SetInputDescription] = useState(task.description)

    //input stato
    const [inputState, SetInputState] = useState(task.status)



    


    const handleSubmit = (e) => {
        e.preventDefault(); // Impedisce il comportamento di default del form (refresh della pagina).
        // Questo è fondamentale perché in React vogliamo gestire tutto tramite JS e non far ricaricare la pagina.

        // Costruisci la task aggiornata con i valori degli input raccolti dagli state.
        // Prendiamo tutti i dati originali della task (come id, createdAt, ecc.) usando lo spread operator (...task)
        // e sovrascriviamo solo i campi che l'utente ha modificato (title, description, status).
        // Così otteniamo un oggetto task completo e aggiornato.
        const updatedTask = {
            ...task, // Mantiene tutte le proprietà originali della task (id, ecc.)
            title: inputName.trim(), // Aggiorna il titolo con il valore dell'input
            description: inputDescription.trim(), // Aggiorna la descrizione
            status: inputState.trim() // Aggiorna lo stato
        };

        // Passa la task aggiornata al componente padre tramite la prop onSave.
        // Il padre si occuperà di fare la chiamata API PUT e aggiornare lo stato globale.
        onSave(updatedTask);
    };
    /*
    PERCHÉ SERVE:
    - Senza questa funzione, il padre riceverebbe solo l'evento del form (un oggetto event), NON i dati aggiornati della task.
    - Il padre non potrebbe sapere quali sono i nuovi valori inseriti dall'utente e quindi non potrebbe aggiornare la task correttamente.
    - Solo così il padre riceve un oggetto task completo e aggiornato, pronto per essere inviato all'API.
    
    SENZA handleSubmit:
    - Il form ricaricherebbe la pagina (comportamento di default HTML).
    - Il padre riceverebbe solo l'evento, non i dati della task aggiornata.
    - Non sarebbe possibile aggiornare la task con i nuovi valori inseriti dall'utente.
    */






    return show && createPortal(
        <Modal
            title="Modifica Task"
            content={
                <form ref={formRef} onSubmit={handleSubmit}>
                    <input type="text" value={inputName} onChange={e => SetInputName(e.target.value)} />

                    <textarea name="description" value={inputDescription} onChange={e => SetInputDescription(e.target.value)}></textarea>

                    <select name="select" value={inputState} onChange={e => SetInputState(e.target.value)}>
                        <option value="">--Seleziona--</option>
                        <option value="To Do">To Do</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </select>
                </form>}
            confirmText="Salva"
            onConfirm={() => formRef.current.requestSubmit()}
            onClose={onClose}
            show={show}
        />,
        document.body

    )
}

