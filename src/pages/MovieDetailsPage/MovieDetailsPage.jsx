import { useEffect, useState,useRef } from "react"
import { Outlet } from "react-router-dom"
import { useParams, useLocation } from "react-router-dom"
import { fetchDetails } from "../../TmbdService"
import { Link, NavLink } from "react-router-dom";
import css from "./MovieDetailsPage.module.css"
import clsx from "clsx";

const getLinkStyle = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
        
}

export default function MovieDetails() {
    const {movieId} = useParams()
    const [movieDetails, setMovieDetails] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const location = useLocation();
    const backLink = useRef(location.state?.from || '/movies');
    
    
    useEffect(() => {
        async function getDetails() {
            try {
                setIsLoading(true);
                setError(false);
                const data = await fetchDetails(movieId)
                setMovieDetails(data)
            } catch (error) {
                setError(true);
            }
            finally {
                setIsLoading(false);
            }
        } 
        getDetails()
    }, [movieId])

    if (isLoading) return <b>Loading...</b>;
    if (error) return <b>Error loading movie details...</b>;
    if (!movieDetails) return <p>No movie details available.</p>;
    
   
   const defaultImg = "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";
    const imageUrl = movieDetails.poster_path
  ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
        : defaultImg;
    
    return (
        <>
            <Link to={backLink.current}>Go Back</Link>  
            
             {isLoading && <b>Loading...</b>}
            {error && <b>Error...</b>}
            
 <  div className={css.container}>
        <div className={css.image}>
            {movieDetails.poster_path && <img className={css.poster} src={imageUrl} alt={movieDetails.title||'No image available...'} />}
        </div>
    <div className={css.details}>
        <h1>{movieDetails.title}</h1>
        <p>User score: {(movieDetails.vote_average * 10).toFixed(0)}%</p>
        <h2>Overview</h2>
        <p>{movieDetails.overview}</p>
        <h2>Genres</h2>
        <p>
            {movieDetails.genres.map((genre) => genre.name).join(', ')} 
        </p>
                </div>
    </div>
       <h3>Additional information</h3>
        <ul>
          <li>
                    <NavLink  className={getLinkStyle} to={`/movies/${movieId}/cast`}>Cast</NavLink>
          </li>
            <li>
                    <NavLink className={getLinkStyle} to={`/movies/${movieId}/reviews`}>Reviews</NavLink>
            </li>
           </ul>
              <Outlet />
        </>
        
    )
}