import { Field, Formik, Form } from 'formik';
import { useState, useEffect } from 'react';
import { fetchSearch } from '../../TmbdService';
import { Link, useSearchParams } from 'react-router-dom';

export default function SearchBox() {
  const [films, setFilms] = useState([]); 
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(false); 
  const [searchParams, setSearchParams] = useSearchParams(); 
  const queryParam = searchParams.get('query') || '';

  const [searchQuery, setSearchQuery] = useState(queryParam); 

  useEffect(() => {
    if (queryParam !== searchQuery) {
      setSearchQuery(queryParam);
    }
  }, [queryParam]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilms([]); 
      return;
    }

    async function getSearchResults() {
      try {
        setIsLoading(true);
        setError(false);
        const results = await fetchSearch(searchQuery); 
        setFilms(results);
      } catch (err) {
        setError(true);
        setFilms([]);
      } finally {
        setIsLoading(false);
      }
    }

    getSearchResults();
  }, [searchQuery]);

  const handleSubmit = (values, { setSubmitting }) => {
    if (!values.searchQuery.trim()) {
      alert('Введите запрос для поиска');
      setSubmitting(false);
      return;
    }
    
    setSearchQuery(values.searchQuery);
    setSearchParams({ query: values.searchQuery });
    setSubmitting(false);
  };

  return (
    <div>
      <Formik
        initialValues={{ searchQuery }} 
        enableReinitialize
        onSubmit={handleSubmit}
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
        {films.length > 0 ? (
          films.map((film) => (
            <li key={film.id}>
              <Link to={`/movies/${film.id}`}>
                <p>{film.title}</p>
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

