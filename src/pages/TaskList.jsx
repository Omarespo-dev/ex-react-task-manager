//Componente figlio per le righe della table
import TaskRow from "../components/TaskRow"

//Mi servono i dati fatti dalla chiamata importo globalContex
import { GlobalContext } from "../contexts/GlobalContext"
//importo il useContext cosi posso utilizzare il contex
import { useContext, useEffect, useState } from "react"




export default function TaskList() {

  console.log("PRIMO RENDER");

  //dati ricavati dalla chiamata Api
  const { data, getData } = useContext(GlobalContext)

  // rimonto il componente per rifare la chiamata e aggiornare
  useEffect(() => {
    getData()
  }, [])



  




    //Aggiungere due state in TaskList.jsx:
    const [sortBy, setSortBy] = useState("createdAt")

    //sortOrder: rappresenta la direzione (1 per crescente, -1 per decrescente).
    const [sortOrder, setSortOrder] = useState(1)


    function orderFunction(a, b){
      
    }
    

    // Implementare la logica di ordinamento con useMemo(), in modo che l’array ordinato venga ricalcolato solo quando cambiano tasks, sortBy o sortOrder:

    // Ordinamento per title → alfabetico (localeCompare).
    const orderTitle = data.sort((a, b) => a.title.localeCompare(b.title))

    // Ordinamento per status → ordine predefinito: "To do" < "Doing" < "Done".
    //setto gia l ordine
    const statusOrder = {
        "To do": 0,
        "Doing": 1,
        "Done": 2
    };

    const orderStatus = data.sort
    // Ordinamento per createdAt → confrontando il valore numerico della data (.getTime()).
    // Applicare sortOrder per definire se l’ordine è crescente o decrescente.

  return (
    <div className="table-container">
      <div className="table">

        <div className="intestazione-set">
          <TaskRow data={data} />
        </div>


      </div>

    </div>
  )
}



