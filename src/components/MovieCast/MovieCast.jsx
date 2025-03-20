import { useEffect,useState } from "react"
import { fetchCast } from "../../TmbdService"
import { useParams } from "react-router-dom"
import css from "./MovieCast.module.css"

export default function MovieCast() {
    const{movieId}=useParams()
    const [moviesCast, setMoviesCast] = useState([])
    const [isLoading, setIsLoading] = useState(false); 
    const [error, setError] = useState(false); 

    
    useEffect(() => {
        async function getCast() {
            try {
                setIsLoading(true);
                setError(false)
                const data = await fetchCast(movieId); 
            
                if (data && Array.isArray(data.cast)) {
                    setMoviesCast(data.cast); 
                   
                } else {
                   
                    setMoviesCast([]); 
                }
            } catch (error) {
                setError(true)
                setMoviesCast([]); 
            }
            finally {
                setIsLoading(false)
            }
        }

        getCast();
    }, [movieId]); 


     if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading....</p>;
    if (moviesCast.length === 0) return <p>The actors composition is missing</p>;
  
    const defaultImg = "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";
    return (
        <div>
             <ul>
                {moviesCast.map((actor) => {
                    const imageUrl = actor.profile_path
                        ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                        : defaultImg; 
                    return (
                        <li key={actor.id}>
                            {imageUrl && <img className={css.actor} src={imageUrl} alt={actor.name} />}
                            <p className={css.actorName}>{actor.name}</p>
                            <p>Character: {actor.character}</p>
                        </li>
                    );
                })}
            </ul>
          </div>
    )
}