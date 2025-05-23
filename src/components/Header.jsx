import { Link, NavLink } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <div className="navbar-flex">
                <nav>
                    <NavLink to="/" style={({ isActive }) => ({
                        color: isActive ? "blue" : "black",
                        borderBottom: isActive ? "1px solid blue" : null
                    })

                    }> Lista Task</NavLink>
                    <NavLink to="/addList" style={({ isActive }) => ({
                        color: isActive ? "blue" : "black",
                        borderBottom: isActive ? "1px solid blue" : null

                    })


                    
                    }>Aggiungi Task</NavLink>
                </nav>
            </div>
        </header>
    )
}
