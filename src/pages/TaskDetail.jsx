
//Mi servono i dati fatti dalla chiamata importo globalContex
import { GlobalContext } from "../contexts/GlobalContext"
//importo il useContext cosi posso utilizzare il contex
import { useContext, useEffect, useState } from "react"



//IMPORTO TOAST ALERT
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//formatto data
import dayjs from 'dayjs';

//redirect
import { useNavigate, useParams } from "react-router-dom";

export default function TaskDetail() {
    //ricavo dati task
    //dati ricavati dalla chiamata Api
    const { data, getData, removeTask } = useContext(GlobalContext)

    // rimonto il componente per rifare la chiamata e aggiornare
    useEffect(() => {
        getData()
    }, [])

    //Hook navigate
    const navigate = useNavigate();

    //recupero id dal url
    const { id } = useParams();

    // faccio il find cose 
    const task = data.find(t => t.id === parseInt(id));
    console.log(task);

    return (

        <div className="container-detail">
            <div className="detail">


                {task ? <section style={{
                    backgroundColor: task.status === "To Do" ? "rgb(239, 193, 193)" :
                        task.status === "Doing" ? "rgb(247, 238, 191)" :
                            task.status === "Done" ? "rgb(220, 252, 231)" : null
                }}>
                    <h3>Titolo: {task.title}</h3>
                    <p>Descrizione: {task.description}</p>
                    <p>Status: {task.status}</p>
                    <p>Creato: {dayjs(task.createdAt).format('DD/MM/YY')} </p>
                    <button onClick={async () => {
                        //aspetto il risultato della promise
                        const response = await removeTask(task.id)

                        if (!response) {
                            toast.success("Task eliminata con successo")
                            navigate("/");
                        } else {
                            toast.error("Errore durante l'eliminazione")
                        }

                    }}>Elimina Task</button>
                </section>

                    :
                    <p>Task non trovato</p>
                }






            </div>

        </div>
    )
}
