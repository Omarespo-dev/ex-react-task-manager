
//Mi servono i dati fatti dalla chiamata importo globalContex
import { GlobalContext } from "../contexts/GlobalContext"
//importo il useContext cosi posso utilizzare il contex
import { useContext, useEffect, useState } from "react"


//formatto data
import dayjs from 'dayjs';

export default function TaskDetail() {
    //ricavo dati task
    //dati ricavati dalla chiamata Api
    const { data, getData } = useContext(GlobalContext)

    // rimonto il componente per rifare la chiamata e aggiornare
    useEffect(() => {
        getData()
    }, [])

    return (

        <div className="container-detail">
            <div className="detail">


                {data.map(task => (
                    <section style={{
                        backgroundColor: task.status === "To Do" ? "rgb(239, 193, 193": 
                            task.status === "Doing" ? "rgb(247, 238, 191)" : 
                            task.status === "Done" ? "rgb(220, 252, 231)" : null
                    }}>
                        <h3>Titolo: {task.title}</h3>
                        <p>Descrizione: {task.description}</p>
                        <p>Status: {task.status}</p>
                        <p>Creato: {dayjs(task.createdAt).format('DD/MM/YY')} </p>
                        <button onClick={() => console.log("Elimino Task")}>Elimina Task</button>
                    </section>
                ))}


            </div>

        </div>
    )
}
