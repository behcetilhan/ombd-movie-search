import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../store/context';
import * as Types from '../store/reducer/types';
import { getStorage, setStorage } from '../helpers/storageData';
import SearchIcon from '../assets/images/search.svg';
import Loading from './Loading';
import { apiRequest } from '../api';

const { SET_LAST_RESULTS } = Types;

const Search = () => {
  const { state, dispatch } = useContext(DataContext);

  const [searchValue, setSearchValue] = useState('');

  const [searchResponses, setSearchResponses] = useState(state.searchResponses);
  const { loading, inputEmpty, errorMessage, storedSearchValue } = state;

  const handleLastSearches = () => {
    setSearchResponses([...searchResponses, searchValue.toLowerCase()]);
    dispatch({
      type: SET_LAST_RESULTS,
      payload: searchResponses,
    });
    setSearchValue('');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    apiRequest(
      searchValue,
      dispatch,
      handleLastSearches,
      errorMessage,
    );
  };

  useEffect(() => {
    const storageItems = getStorage('searchResponses');
    if (searchResponses.length > 3) {
      searchResponses.shift();
    }
    if (
      !inputEmpty &&
      !storageItems.includes(searchValue.toLowerCase()) &&
      !storageItems.includes(storedSearchValue.toLowerCase())
    ) {
      setStorage(searchResponses);
    }
  });

  return (
    <form onSubmit={handleSearch}>
      <div className="b-search">
        <input
          className={`form-control b-search__input ${
            inputEmpty ? 'b-search__input--error' : ''
          }`}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={(e) => (e.target.value = '')}
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
  );
};

export default Search;
