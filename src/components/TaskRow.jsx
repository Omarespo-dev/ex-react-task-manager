

//formatto data
import dayjs from 'dayjs';

//importo memo per evitare il re render di questo componente
import { memo, useMemo, useState } from "react";


//import link
import { Link, useParams } from 'react-router-dom';

// mostrerà l'elenco dei task.


const TaskRow = memo(({ data , sortBy , sortOrder,handleSort ,sortIcon, sortedTask}) => {

    console.log("SECONDO RENDER");


    

    return (
        <>
        
            <div className="nome-colonna">
                <thead>
                    <tr>
                        <th style={{color:'gray'}} onClick={() => handleSort("title")}>
                            Nome {sortBy === "title" && sortIcon}
                        </th>
                    </tr>
                </thead>

                {sortedTask.map(element => (
                    <section key={element.id} className="table-section">
                        <Link to={`task/${element.id}`}>
                            <span>
                                {element.title}
                            </span>
                        </Link>
                    </section>
                ))}

            </div>


            <div className="stato-colonna">
                 <thead>
                    <tr>
                        <th style={{color:'gray'}} onClick={() => handleSort("status")}>
                            Stato {sortBy === "status" && sortIcon}
                        </th>
                    </tr>
                </thead>

                {sortedTask.map(element => (
                    <section key={element.id} className="table-section">
                        <span style={{
                            color: element.status === "To do" ? "red" :
                                element.status === "Doing" ? "rgba(162,102,50,255)" :
                                    element.status === "Done" ? "rgba(58,129,103,255)" : null,

                            backgroundColor: element.status === "To do" ? "rgb(239, 193, 193)" :
                                element.status === "Doing" ? "rgb(247, 238, 191)" :
                                    element.status === "Done" ? "rgba(220,252,231,255)" : null,
                            padding: "5px 10px",
                            borderRadius: "10px"
                        }}>

                            {element.status}
                        </span>
                    </section>
                ))}
            </div>


            <div className="Created-colonna">
                 <thead>
                    <tr>
                        <th style={{color:'gray'}} onClick={() => handleSort("createdAt")}>
                            Data di creazione {sortBy === "createdAt" && sortIcon}
                        </th>
                    </tr>
                </thead>


                {sortedTask.map(element => (
                    <section key={element.id} className="table-section">
                        <span>
                            {dayjs(element.createdAt).format('DD/MM/YY')}
                        </span>
                    </section>
                ))}
            </div>

        </>

    )
})

export default TaskRow




