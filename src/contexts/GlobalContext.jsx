//importiamoil contesto 
import { createContext, useEffect, useState } from "react";


//definiamo il Global context
const GlobalContext = createContext()

//coustom hook 
import useTasks from "../hook/useTasks";


// Funzione da rendere disponibile in tutto il codice


export default function GlobalProvider({ children }) {
    
    //Utilizzo hook per le task
    const {data} = useTasks(import.meta.env.VITE_API_URL + "/tasks")

    //Lista 
    console.log(data);
    
    return (
        <GlobalContext.Provider value={{data}}>
            {children}
        </GlobalContext.Provider>
    )
}

// Esporto anche il contesto così puoi usarlo con useContext
export { GlobalContext };  

