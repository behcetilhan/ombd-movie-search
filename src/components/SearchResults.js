import React, { useContext } from 'react';
import { DataContext } from '../store/context';
import Movie from './Movie';

const SearchResults = () => {
  const { state } = useContext(DataContext);
  const { movies, storedSearchValue } = state;

  const setMovieData = () => {
    return movies.map((movie, i) => {
      return (
        <li
          key={`${movie.imdbID}-${i}`}
          className="b-search-results__list-item"
        >
          <Movie movie={movie} />
        </li>
      );
    });
  };

  return (
    <div className="b-search-results">
      {storedSearchValue && (
        <div className="b-search-results__title">
          Showing results for <span>{storedSearchValue}</span>
        </div>
      )}
      <ul className="b-search-results__list">{setMovieData()}</ul>
    </div>
  );
};

export default SearchResults;
