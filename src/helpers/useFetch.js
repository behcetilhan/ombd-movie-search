import { useEffect, useContext, useState } from 'react';
import { DataContext } from '../store/context';
import * as Types from '../store/reducer/types';

const {
  GET_API_DATA,
  DATA_LOADED,
  API_ERROR,
  SET_LOADING,
  SET_SEARCH_TITLE,
} = Types;

const useFetch = ({
  api,
  method,
  url,
  data = null,
  config = null,
  skip = false,
  searchValue,
}) => {
  const { dispatch } = useContext(DataContext);
  const [refetchIndex, setRefetchIndex] = useState(0);

  const refetch = () => {
    setRefetchIndex((prevRefetchIndex) => prevRefetchIndex + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (skip) return;
      dispatch({
        type: SET_LOADING,
      });
      api[method](url, JSON.parse(config), JSON.parse(data))
        .then((res) => {
          if (!res.data.Error) {
            dispatch({
              type: GET_API_DATA,
              payload: res.data.Search,
              resultsVisible: true,
            });
            dispatch({
              type: SET_SEARCH_TITLE,
              payload: searchValue,
            });
          } else {
            dispatch({
              type: API_ERROR,
              payload: res.data.Error,
              resultsVisible: false,
            });
          }
        })
        .catch((res) => {
          dispatch({
            type: API_ERROR,
            payload: 'An error occurred. Please check your credentials',
            resultsVisible: false,
          });
        })
        .finally(() => {
          dispatch({
            type: DATA_LOADED,
          });
        });
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, refetchIndex]);

  return { refetch };
};

export default useFetch;
