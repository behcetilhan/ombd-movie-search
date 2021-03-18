import * as Types from './types';

const {
  SEARCH_MOVIES_REQUEST,
  SEARCH_MOVIES_SUCCESS,
  SEARCH_MOVIES_FAILURE,
  SET_SEARCH_TITLE,
  SET_LAST_RESULTS,
  INPUT_INVALIDATE,
} = Types;

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_SEARCH_TITLE:
      return {
        ...state,
        storedSearchValue: action.payload,
      };
    case SEARCH_MOVIES_REQUEST:
      return {
        ...state,
        loading: true,
        errorMessage: null,
      };
    case SEARCH_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        movies: action.payload,
        inputEmpty: false,
      };
    case SEARCH_MOVIES_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
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
