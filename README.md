# Omdb Movie Search

![Vercel](http://therealsujitk-vercel-badge.vercel.app/?app=ombd-movie-search)
### [DEMO](https://ombd-movie-search-behcetilhan.vercel.app/)
Another example app for searching omdb movie database

## Features

- Ability to search omdb databese with given movie title
- Ability to list searched movies with it's poster
- Mobile firendly UI
- Search input minimum length validation
- Ability to save last three searches on localstorage 
- Ability to re init search function from localstroge items
- Ability to handle api & user input errors

---
## Tech

Omdb Movie Search is bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and uses open source projects listed below to work properly:

- [Axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js
- [Devtool for React Context and useReducer Hook](https://github.com/deeppatel234/react-context-devtool) - DevTools extension for better context debugging
- [Bootstrap SCSS](https://www.npmjs.com/package/bootstrap-scss) - Sleek, intuitive, and powerful front-end framework for faster and easier web development.

---
## Installation & Available Scripts

Omdb Movie Search requires [Node.js](https://nodejs.org/) v10+ to run.

Cloning project and installing dependencies

```sh
git clone https://github.com/behcetilhan/ombd-movie-search
cd ombd-movie-search
npm i
```

In the project directory, you can run:

##### `npm start`
Runs the app in the development mode. The page will reload if you make edits.
You will also see any lint errors in the console.

##### `npm build`
Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.

## App Flow & Code Examples

App uses axios to fetch data from [OMDB API](http://www.omdbapi.com/). Then it passes the returned data to localstorage and app context for app-wide usage.

App is initializes with an itial state created and distributed by the Context. Also checks localstorage for any previous user searches

```sh
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

```

`useFetch` is a custom hook which is used to call the data. Kudos to [onur.dev](https://onur.dev/writing/useFetch-react-hook). It can be initiated on component load or on given condition using `skip` prop

```sh
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
```

## ToDo's & Known Issues

- Unit testing
- Search input should be updated accordingly if user clicks on any saved result.
