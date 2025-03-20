import { NavLink } from 'react-router-dom';
import clsx from "clsx";
import css from "./Navigation.module.css"


const getLinkStyle = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
        
}

export default function Navigation() {
    return (
        <header className={css.header}>
            <nav className={css.header}>
                <ul className={css.list}>
                    <li>  <NavLink className={getLinkStyle} to="/">Home</NavLink></li>
       
                    <li> <NavLink className={getLinkStyle} to="/movies">Movies</NavLink></li> 
          </ul>     
            </nav>
            </header>
    )
}


