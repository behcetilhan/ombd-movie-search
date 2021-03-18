import React, { createContext, useReducer } from 'react';
import { reducer } from '../reducer';
import { getStorage } from '../../helpers/storageData';

export const initialState = {
  loading: false,
  movies: [],
  errorMessage: null,
  storedSearchValue: '',
  searchResponses: getStorage('searchResponses') || [],
  inputEmpty: false,
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
