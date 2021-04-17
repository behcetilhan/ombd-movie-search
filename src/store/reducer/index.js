import * as Types from './types';

const {
  GET_API_DATA,
  DATA_LOADED,
  API_ERROR,
  SET_LOADING,
  SET_SEARCH_TITLE,
  SET_LAST_RESULTS,
  INPUT_INVALIDATE,
} = Types;

export const reducer = (state, action) => {
  switch (action.type) {
    case DATA_LOADED:
      return {
        ...state,
        loading: false,
      };
    case API_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
        resultsVisible: action.resultsVisible,
      };
    case GET_API_DATA:
      return {
        ...state,
        returnedData: action.payload,
        inputEmpty: false,
        resultsVisible: action.resultsVisible,
      };
    case SET_SEARCH_TITLE:
      return {
        ...state,
        storedSearchValue: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
        errorMessage: null,
        inputEmpty: false,
      };
    case SET_LAST_RESULTS:
      return {
        ...state,
        searchResponses: action.payload,
      };
    case INPUT_INVALIDATE:
      return {
        ...state,
        inputEmpty: action.payload,
      };
    default:
      return state;
  }
};
