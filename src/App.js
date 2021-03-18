import React from 'react';
import './scss/App.scss';
import Search from './components/Search';
import SearchResults from './components/SearchResults';
import SavedResults from './components/SavedResults';

function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <Search />
          <SavedResults />
        </div>
        <div className="col-12">
          <SearchResults />
        </div>
      </div>
    </div>
  );
}

export default App;
