//Componente figlio per le righe della table
import dayjs from "dayjs";
import TaskRow from "../components/TaskRow"

//Mi servono i dati fatti dalla chiamata importo globalContex
import { GlobalContext } from "../contexts/GlobalContext"
//importo il useContext cosi posso utilizzare il contex
import { useContext, useEffect, useMemo, useState } from "react"




export default function TaskList() {

  console.log("PRIMO RENDER");

  //dati ricavati dalla chiamata Api
  const { data, getData } = useContext(GlobalContext)

  // rimonto il componente per rifare la chiamata e aggiornare
  useEffect(() => {
    getData()
  }, [])

  //Aggiungere due state in TaskList.jsx:

  //ortBy: rappresenta il criterio di ordinamento (title, status, createdAt).
  const [sortBy, setSortBy] = useState("createdAt")

  //sortOrder: rappresenta la direzione (1 per crescente, -1 per decrescente).
  const [sortOrder, setSortOrder] = useState(1)

  //stato per input ricerca
  const [searchQuery, setSearchQuery] = useState("")

  function orderFunction(a, b) {

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



  //Modificare l'useMemo() per filtrare e ordinare i task

  // Applicare il filtraggio basato su searchQuery.
  const filtered = useMemo(() => {
    // console.log("Filtraggio eseguito");
    return data.filter(ta => ta.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      ta.status.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      dayjs(ta.createdAt).format('DD/MM/YY').toLowerCase().includes(searchQuery.toLowerCase().trim())
    )
  }, [data, searchQuery])

  

  // La ricerca deve essere case insensitive.
  // Ordinare i risultati in base ai criteri esistenti (es. nome, stato, data di creazione).
  return (<>
    <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
      <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
      
    </div>

    <div className="table-container">

      <div className="table">

        <div className="intestazione-set">
          <TaskRow data={filtered} sortBy={{ sortBy, setSortBy }} sortOrder={{ sortOrder, setSortOrder }} />
        </div>


      </div>

    </div>
  </>

  )
}



