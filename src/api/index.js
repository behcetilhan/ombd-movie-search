import axios from 'axios';

export const omdbApi = axios.create({
  baseURL: 'https://www.omdbapi.com/',
});


/* import * as Types from '../store/reducer/types';
import axios from 'axios';
import * as API_CONFIG from '../helpers/config';

const { URL, KEY } = API_CONFIG;

const {
  SEARCH_MOVIES_REQUEST,
  SEARCH_MOVIES_SUCCESS,
  SEARCH_MOVIES_FAILURE,
  INPUT_INVALIDATE,
  SET_SEARCH_TITLE
} = Types;

export const apiRequest = (
  searchValue,
  dispatch,
  handleLastSearches,
) => {
  if (searchValue && searchValue.trim().length > 0) {
    dispatch({
      type: SEARCH_MOVIES_REQUEST,
    });
    return axios
      .get(`${URL}?s=${searchValue}&apikey=${KEY}`)
      .then((jsonResponse) => {
        if (jsonResponse.data.Response === 'True') {
          dispatch({
            type: SEARCH_MOVIES_SUCCESS,
            payload: jsonResponse.data.Search,
          });
          dispatch({
            type: SET_SEARCH_TITLE,
            payload: searchValue,
          });
          if (handleLastSearches) {
            handleLastSearches();
          }
        } else {
          dispatch({
            type: SEARCH_MOVIES_FAILURE,
            error: jsonResponse.data.Error,
          });
        }
      });
  } else {
    dispatch({
      type: INPUT_INVALIDATE,
      payload: true,
    });
  }
};
 */