import {  NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import css from "./MovieList.module.css"
import clsx from "clsx";

const getLinkStyle = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
        
}

export default function MovieList({ movies }) {
    const location = useLocation()
    return (
        < ul className={css.list}>
            {movies.map((movie) => (
                    <li key={movie.id}>

                <NavLink className={getLinkStyle}  to={`/movies/${movie.id}` }state={{ from: location }}>
                        <p className={css.text}>{movie.title || movie.name || movie.original_title}</p>
                   
                    </NavLink>
                 </li>
            ))}
        </ul>
    );
}