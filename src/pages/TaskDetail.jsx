
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


//importo la modale
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";

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

    // faccio il find per ritornare il primo oggetto che soddisfa questa condizione
    const task = data.find(t => t.id === parseInt(id));


    //stato per show della modale on o ff CONFERMA
    const [show, setShow] = useState(false)

    //STATO PER LA MODALE EDITTASK PER LA MODIFICA
    const [showTask, SetShowTask] = useState(false)

    //funzione per la conferma della modale all invio 
    async function ConfirmModal() {

        //aspetto il risultato della promise
        const response = await removeTask(task.id)

        if (!response) {
            toast.success("Task eliminata con successo")
            navigate("/");
        } else {
            toast.error("Errore durante l'eliminazione")
        }


    }

    
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
                    <button onClick={() => setShow(true)} >Elimina Task</button>
                    <button onClick={() => SetShowTask(true)}>Modifica Task</button>
                </section>

                    :
                    <p>Task non trovato</p>
                }


                <Modal
                    title="Sei sicuro di procedere?"
                    content="Opzione e irreversibile"
                    show={show}
                    onClose={() => setShow(false)}
                    onConfirm={ConfirmModal}
                />



                <EditTaskModal
                    show={showTask}
                    onClose={() => SetShowTask(false)}
                />


            </div>

        </div>
    )
}



