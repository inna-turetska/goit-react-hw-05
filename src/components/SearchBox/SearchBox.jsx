import { Field, Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import css from "./SearchBox.module.css"

export default function SearchBox({ onSearch, movies, isLoading, error,searchQuery }) 

{ 

  return (
    <div>
      <Formik
        initialValues={{ searchQuery:searchQuery||"" }} 
        enableReinitialize
        onSubmit={onSearch}
      >
        {({ isSubmitting, handleChange, values }) => (
          <Form className={css.form}>
            <Field
              className={css.input}
              type="text"
              name="searchQuery"
              placeholder="Поиск фильмов"
              value={values.searchQuery}
               onChange={handleChange}
            />
            <button   className={css.button} type="submit" disabled={isSubmitting}>
              Искать
            </button>
          </Form>
        )}
      </Formik>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error, try later</p>} 

   
    </div>
  );
}

