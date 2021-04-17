import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../store/context';
import useFetch from '../helpers/useFetch';
import { omdbApi } from '../api';
import * as Types from '../store/reducer/types';
import { setStorage } from '../helpers/storageData';
import SearchIcon from '../assets/images/search.svg';
import Loading from './Loading';

import * as API_CONFIG from '../helpers/config';
import SearchResults from './SearchResults';
import SavedResults from './SavedResults';

const {
  SET_LAST_RESULTS,
  INPUT_INVALIDATE,
  API_ERROR,
  SET_SEARCH_TITLE,
} = Types;
const { URL, KEY } = API_CONFIG;

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const [manualFetch, setManualFetch] = useState(true);

  const { refetch } = useFetch({
    api: omdbApi,
    method: 'get',
    url: `${URL}?s=${searchValue}&apikey=${KEY}`,
    skip: manualFetch,
    searchValue: searchValue,
  });

  const { state, dispatch } = useContext(DataContext);

  const [searchResponses, setSearchResponses] = useState(state.searchResponses);

  const {
    loading,
    inputEmpty,
    storedSearchValue,
    resultsVisible,
    errorMessage,
  } = state;

  useEffect(() => {
    setManualFetch(true);
    dispatch({
      type: SET_LAST_RESULTS,
      payload: searchResponses,
    });

    if (searchResponses.length > 3) {
      searchResponses.shift();
    }

    if (errorMessage) {
      dispatch({
        type: SET_SEARCH_TITLE,
        payload: '',
      });
    }

    setStorage(searchResponses);
  }, [searchResponses, storedSearchValue, errorMessage, dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim().length > 2) {
      if (storedSearchValue.toLowerCase() === searchValue.toLowerCase()) {
        return;
      }
      setManualFetch(false);
      refetch();

      if (
        storedSearchValue &&
        !searchResponses.includes(storedSearchValue.toLowerCase())
      ) {
        setSearchResponses([
          ...searchResponses,
          storedSearchValue.toLowerCase(),
        ]);
      }
    } else {
      dispatch({
        type: INPUT_INVALIDATE,
        payload: true,
      });
      dispatch({
        type: API_ERROR,
        payload: 'Enter Minimum 3 Charters',
      });
    }
  };

  return (
    <>
      <div className="col-md-6 offset-md-3">
        <form onSubmit={handleSearch}>
          <div className="b-search">
            <input
              className={`form-control b-search__input ${
                inputEmpty ? 'b-search__input--error' : ''
              }`}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              onFocus={(e) => {
                e.target.value = '';
                setSearchValue(e.target.value);
              }}
              value={searchValue}
              type="text"
              placeholder="Search For Movies"
            />
            {loading ? (
              <Loading />
            ) : (
              <button type="submit" className="btn b-search__button">
                <img
                  className="b-search__button-icon"
                  src={SearchIcon}
                  alt="Search"
                />
              </button>
            )}
          </div>
        </form>
        <SavedResults />
      </div>
      {resultsVisible && (
        <div className="col-12">
          <SearchResults />
        </div>
      )}
    </>
  );
};

export default Search;
