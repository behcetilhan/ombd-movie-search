import React, { createContext, useReducer } from 'react';
import { reducer } from '../reducer';
import { getStorage } from '../../helpers/storageData';

export const initialState = {
  returnedData: [],
  errorMessage: null,
  loading: false,
  storedSearchValue: '',
  searchResponses: getStorage('searchResponses') || [],
  inputEmpty: false,
  resultsVisible: false,
  searchInputPlaceholder: ''
};

export const DataContext = createContext();

const MovieResultsProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {props.children}
    </DataContext.Provider>
  );
};

export default MovieResultsProvider;
