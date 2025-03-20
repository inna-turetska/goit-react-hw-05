import { Field, Formik, Form } from 'formik';
import { Link } from 'react-router-dom';

export default function SearchBox({ onSearch, movies, isLoading, error,searchQuery }) 

{ 

  return (
    <div>
      <Formik
        initialValues={{ searchQuery:"" }} 
        enableReinitialize
        onSubmit={onSearch}
      >
        {({ isSubmitting, handleChange, values }) => (
          <Form>
            <Field
              type="text"
              name="searchQuery"
              placeholder="Поиск фильмов"
              value={values.searchQuery}
              onChange={handleChange}
            />
            <button type="submit" disabled={isSubmitting}>
              Искать
            </button>
          </Form>
        )}
      </Formik>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error, try later</p>} 

      <ul>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                <p>{movie.title}</p>
              </Link>
            </li>
          ))
        ) : (
          searchQuery && !isLoading && !error && <p>Movies not found</p>
        )}
      </ul>
    </div>
  );
}

