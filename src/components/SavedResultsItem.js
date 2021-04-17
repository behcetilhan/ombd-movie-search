import React, { useState } from 'react';
import useFetch from '../helpers/useFetch';
import { omdbApi } from '../api';
import * as API_CONFIG from '../helpers/config';

const { URL, KEY } = API_CONFIG;

const SavedResultsItem = ({ movieTitle }) => {
  const [searchValue, setSearchValue] = useState('');
  const [manualFetch, setManualFetch] = useState(true);

  const { refetch } = useFetch({
    api: omdbApi,
    method: 'get',
    url: `${URL}?s=${searchValue}&apikey=${KEY}`,
    skip: manualFetch,
    searchValue: searchValue,
  });

  return (
    <button
      type="button"
      className="btn btn-primary btn-sm b-saved-results__item"
      onClick={() => {
        setSearchValue(movieTitle);
        setManualFetch(false);
        refetch();
      }}
    >
      {movieTitle}
    </button>
  );
};

export default SavedResultsItem;
