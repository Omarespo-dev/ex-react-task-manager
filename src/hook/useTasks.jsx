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

            // console.log("Errore completo:", err.response);

            // Errore di rete (es. server non raggiungibile, timeout)
            if (!err.response) {
                throw new Error("Errore di connessione al server");
            }

        }
    }

    useEffect(() => {
        getData()
    }, [])


    //     Definire le funzioni addTask, removeTask, updateTask all'interno di useTasks(), lasciandole vuote per ora.

    async function addTask({ title, description, status }) {

        try {

            //controllo se c e un titolo uguale
            if (data.some(task => task.title.toLowerCase() === title.toLowerCase())) {
                throw new Error("Impossibile creare un nuovo Task con questo titolo già esistente");
            }


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

            if (!err.response) {
                // Se l'errore NON ha la proprietà 'response', significa che NON arriva da Axios (quindi non è un errore di rete/server),
                // ma è stato generato manualmente nel codice, ad esempio con 'throw new Error("Titolo già esistente")'.
                // In questo caso, rilanciamo lo stesso errore per farlo gestire dal componente che ha chiamato la funzione.
                throw err;
            }
            // Se invece l'errore HA la proprietà 'response', significa che è un errore di rete/server (Axios).
            // In questo caso, lanciamo un nuovo errore generico per informare l'utente che c'è un problema di connessione.
            throw new Error("Errore di connessione al server");

        }

    }

    async function removeTask(taskId) {


        try {
            const response = await axios.delete(`${url}/${taskId}`)

            // Caso di successo della chiamata e insuccesso
            if (response.data.success) {
                SetData(curr => curr.filter(task => {
                    return task.id === taskId ? false : true
                }))
            } else {
                throw new Error(`${response.data.message}`);
            }

        } catch (err) {

            if (!err.response) {
                throw new Error("Errore di connessione al server");
            }

        }
    }

    async function updateTask({ updatedTask }) {

        try {

            // Controllo duplicati escludendo la task che stiamo aggiornando
            if (data.some(task => task.id !== updatedTask.id && task.title.toLowerCase() === updatedTask.title.toLowerCase())) {
                throw new Error("Impossibile modificare la Task con questo titolo già esistente");
            }

            const response = await axios.put(`${url}/${updatedTask.id}`, updatedTask)

            // Caso di successo della chiamata e insuccesso
            if (response.data.success) {
                SetData(curr => curr.map(task => {
                    // Se l'id della task corrente corrisponde all'id della task da aggiornare
                    // restituisci la nuova versione (updatedTask), altrimenti mantieni la vecchia (task)
                    return task.id === updatedTask.id ? updatedTask : task
                }))
            } else {
                throw new Error(response.data.message);
            }


        } catch (err) {

            if (!err.response) {
                throw new Error("Errore di connesione al server");
            }

            throw err;
        }

    }

    return { data, addTask, removeTask, updateTask, getData }
}


