// Creare un custom hook per centralizzare la gestione dei task e semplificare l'accesso ai dati.

import { useEffect, useState } from "react";
import  axios  from "axios";

export default function useTasks(url) {

    //stato locale per i dati
    const [data,SetData] = useState([])


    // Creare un hook useTasks() che recupera i task iniziali con una richiesta GET a /tasks e li memorizza in uno stato locale (useState).
    async function getData() {
        
        try{
            const response = await axios.get(url)

            SetData(response.data)

        }catch(err){
            
            if(err){
                console.err("Errore nel server", err.response.status)
            }
        }
    }

    useEffect(() => {
        getData()
    },[])


    //     Definire le funzioni addTask, removeTask, updateTask all'interno di useTasks(), lasciandole vuote per ora.

    function addTask(){

    }

    function removeTask(){
        
    }

    function updateTask(){

    }

    return { data, addTask, removeTask, updateTask }
}




//  Rendere disponibili le funzioni e la lista dei task restituendole come valore dell'hook.

//     Integrare useTasks() nel GlobalContext, in modo che tutti i componenti possano accedere ai task e alle funzioni di gestione.