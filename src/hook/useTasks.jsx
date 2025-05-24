// Creare un custom hook per centralizzare la gestione dei task e semplificare l'accesso ai dati.

import { useEffect, useState } from "react";
import axios from "axios";

export default function useTasks(url) {

    //stato locale per i dati || // appena inviamo la task il server ci risponde con la task appena creata e lo stato ci serve per mostrarlo in page
    const [data, SetData] = useState([])

    
    

    // Creare un hook useTasks() che recupera i task iniziali con una richiesta GET a /tasks e li memorizza in uno stato locale (useState).
    async function getData() {

        try {
            const response = await axios.get(url)

            SetData(response.data)

        } catch (err) {

            if (err) {
                console.err("Errore nel server", err.response.status)
            }
        }
    }

    useEffect(() => {
        getData()
    }, [])


    //     Definire le funzioni addTask, removeTask, updateTask all'interno di useTasks(), lasciandole vuote per ora.

    async function addTask({ title, description, status }) {

        try {
            const response = await axios.post(url,
                { title, description, status }
            )
            console.log(response);

            // Caso di successo della chiamata e insuccesso
            if (response.data.success) {
                SetData(curr => [...curr, response.data.task])
            } else if (!response.data.success) {
                throw new Error(`${response.data.message}`);

            }


        } catch (err) {

            if (err) {
                console.err("Errore del server ", err.response.status)
            }
        }

    }

    function removeTask() {

    }

    function updateTask() {

    }

    return { data, addTask, removeTask, updateTask, getData}
}


