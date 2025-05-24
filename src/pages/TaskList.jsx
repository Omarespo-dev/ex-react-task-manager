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

  useEffect(() => {
    getData()
  }, [])


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



