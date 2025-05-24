//Componente figlio per le righe della table
import TaskRow from "../components/TaskRow"

//Mi servono i dati fatti dalla chiamata importo globalContex
import { GlobalContext } from "../contexts/GlobalContext"
//importo il useContext cosi posso utilizzare il contex
import { useContext, useState } from "react"

export default function TaskList() {
  
  console.log("PRIMO RENDER");
  

  const { data, setData } = useContext(GlobalContext)

  //testo il render del componente figlio se viene effutuato
  const [count, setCount] = useState(0)

  return (
    <div className="table-container">
      <div className="table">
        <div className="intestazione-set">
          <TaskRow data={data} />
        </div>

        {/* test */}
        <button onClick={() => setCount(count + 1)}> incrementa</button>
      </div>

    </div>
  )
}



