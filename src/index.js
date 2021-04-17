import React from 'react';
import ReactDOM from 'react-dom';
import { debugContextDevtool } from 'react-context-devtool';
import App from './App';
import reportWebVitals from './reportWebVitals';
import MovieResultsProvider from './store/context';

ReactDOM.render(
  <React.StrictMode>
    <MovieResultsProvider>
      <App />
    </MovieResultsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
debugContextDevtool(document.getElementById('root'), {
  disable: process.env.NODE_ENV === "production"
});
