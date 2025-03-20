import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MovieCast from "./components/MovieCast/MovieCast"
import MovieReviews from "./components/MovieReviews/MovieReviews"
import Navigation from "./components/Navigation/Navigation";
import './App.css'

export const App = () => {
  return (
    <div>
      <Navigation/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />} >
         <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
          </Route>
         <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </div>
  );
}
 
  


export default App
