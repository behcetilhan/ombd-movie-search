import React, { useContext } from 'react';
import { DataContext } from '../store/context';
import { apiRequest } from '../api';

const SavedResultsItem = ({ movieTitle }) => {
  const { dispatch } = useContext(DataContext);

  return (
    <button
      type="button"
      className="btn btn-primary btn-sm b-saved-results__item"
      onClick={(e) => {
        e.preventDefault();
        apiRequest(movieTitle, dispatch);
      }}
    >
      {movieTitle}
    </button>
  );
};

export default SavedResultsItem;
