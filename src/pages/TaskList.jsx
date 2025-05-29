//Componente figlio per le righe della table
import dayjs from "dayjs";
import TaskRow from "../components/TaskRow"

//Mi servono i dati fatti dalla chiamata importo globalContex
import { GlobalContext } from "../contexts/GlobalContext"
//importo il useContext cosi posso utilizzare il contex
import { useCallback, useContext, useEffect, useMemo, useState } from "react"

//Funzione di debounce
function debounce(callback, delay) {

  //clouser
  let timer;

  return (value) => {
    clearInterval(timer)
    timer = setTimeout(() => {
      callback(value)
    }, delay)
  }
}


export default function TaskList() {

  console.log("PRIMO RENDER");

  //dati ricavati dalla chiamata Api
  const { data, getData } = useContext(GlobalContext)

  // rimonto il componente per rifare la chiamata e aggiornare
  useEffect(() => {
    getData()
  }, [])

  //stato per input ricerca
  const [searchQuery, setSearchQuery] = useState("")
  // funzione input debouncata
  const debounceSetSearchQuery = useCallback(
    debounce(setSearchQuery, 500)
    , [])

  //SortBy: rappresenta il criterio di ordinamento (title, status, createdAt).
  const [sortBy, setSortBy] = useState("createdAt")

  //sortOrder: rappresenta la direzione (1 per crescente, -1 per decrescente).
  const [sortOrder, setSortOrder] = useState(1)



  //icona
  const sortIcon = sortOrder === 1 ? "↓" : "↑"

  //handleSort
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(prev => prev * -1)
    } else {
      setSortBy(field)
      setSortOrder(1)
    }
  }



  //Modificare l'useMemo() per filtrare e ordinare i task
  // Applicare il filtraggio basato su searchQuery.
  const filtered = useMemo(() => {
    // console.log("Filtraggio eseguito");
    return data.filter(ta => ta.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      ta.status.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      dayjs(ta.createdAt).format('DD/MM/YY').toLowerCase().includes(searchQuery.toLowerCase().trim())
    )
  }, [data, searchQuery])



  // Poi: ordina i filtrati
  const filteredAndSorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let comparison;
      if (sortBy === "title") {
        comparison = a.title.localeCompare(b.title)
      } else if (sortBy === "status") {
        const statusOption = ["To do", "Doing", "Done"]
        comparison = statusOption.indexOf(a.status) - statusOption.indexOf(b.status)
      } else if (sortBy === "createdAt") {
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      }
      return comparison * sortOrder
    })
  }, [filtered, sortBy, sortOrder])


  // La ricerca deve essere case insensitive.
  // Ordinare i risultati in base ai criteri esistenti (es. nome, stato, data di creazione).
  return (<>

    <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
      <input type="text"  onChange={e => debounceSetSearchQuery(e.target.value)} />
    </div>

    <div className="table-container">

      {filteredAndSorted.length > 0 ?
        <div className="table">

          <div className="intestazione-set">
            <TaskRow data={filtered} sortBy={sortBy} sortOrder={sortOrder} handleSort={handleSort} sortIcon={sortIcon} sortedTask={filteredAndSorted} />

          </div>


        </div>

        : <p>Nessuna Task trovata</p>}

    </div>
  </>

  )
}



