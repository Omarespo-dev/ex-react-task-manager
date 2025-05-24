//importiamoil contesto 
import axios from "axios";
import { createContext, useEffect, useState } from "react";

//definiamo il Global context
const GlobalContext = createContext()



// Funzione da rendere disponibile in tutto il codice


export default function GlobalProvider({ children }) {
    //Imposto lo stato dove ci saranno i dati fatti da una api
    const [data, SetData] = useState([])


    //Effettuare una richiesta GET a /tasks al caricamento dell'app, utilizzando useEffect, e salvare i dati nello stato.
    async function getData() {
        try {

            const response = await axios.get(import.meta.env.VITE_API_URL + "/tasks")

            SetData(response.data)

        } catch (err) {
            // gestione errore 404 0 500
            if (err.response) {
                console.error(`Errore Server ${err.response.status}`);
            }
        }



    }

    useEffect(() => {
        getData()
    }, [])

    //Lista 
    console.log(data);
    

    return (
        <GlobalContext.Provider value={{ data, SetData }}>
            {children}
        </GlobalContext.Provider>
    )
}

