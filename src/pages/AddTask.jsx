// conterrà il form per aggiungere un nuovo task.

import { useRef, useState } from "react"
import useTasks from "../hook/useTasks";

// Utilizzare una costante con i caratteri vietati:
const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";


export default function AddTask() {

  //stato per input controllato
  const [inputControlled, SetInputControlled] = useState('')

  //stato per gestione errore Generale Form
  const [error, SetError] = useState("")

  //stato per gestione errore Name
  const [errorName, SetErrorName] = useState("")

  //Setto gli input non controllati
  const descriptioRef = useRef()
  const selectRef = useRef()



  //ricavo costoum hook
  const { addTask } = useTasks(import.meta.env.VITE_API_URL + "/tasks")

  function FormSubmit(e) {
    e.preventDefault()


    //validazione del name
    // Validazione campo nome
    if (inputControlled.trim() === "") {
      SetErrorName("Il campo non può essere vuoto");

    }

    if (inputControlled.split("").some(car => symbols.includes(car))) {
      SetErrorName("Non può contenere simboli speciali");
      return
    }

    //validazione generale del form
    if (
      !descriptioRef.current.value.trim() ||
      !selectRef.current.value.trim()

    ) {
      SetError("Devi compilare tutti i campi")
      return
    } else {
      SetError("")
    }


    console.log(`
      Il nome e: ${inputControlled}
      La Descrizione e: ${descriptioRef.current.value}
      La Select e: ${selectRef.current.value}`);

      
    addTask({
      title: inputControlled,
      description: descriptioRef.current.value,
      status: selectRef.current.value
    })


    // Reset campi
    SetInputControlled("");
    descriptioRef.current.value = "";
    selectRef.current.value = "";
    SetErrorName("")
  }



  return (
    <div className="container">
      <div className="container-form">
        <form action="submit" onSubmit={FormSubmit}>
          {/* Input controllato */}
          <input type="text"
            placeholder="Inserisci Nome"
            value={inputControlled}
            onChange={(e) => SetInputControlled(e.target.value)}

          />
          <p style={{ color: errorName ? "red" : null }}> {errorName} </p>


          {/* Input  non controllato */}
          <textarea name="description"
            placeholder="Inserisci descrizione"
            ref={descriptioRef} />


          {/* Input non controllato */}
          <select name="status" ref={selectRef}>
            <option value="">--Please choose an option--</option>

            <option value="To do">To do</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>

          <button>Add Task</button>
        </form>

        <p style={{ color: error ? "red" : null }}>{error} </p>


      </div>

    </div>
  )
}

