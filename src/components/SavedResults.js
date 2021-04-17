import React, { useContext } from 'react';
import { DataContext } from '../store/context';
import { clearStorage } from '../helpers/storageData';
import SavedResultsItem from './SavedResultsItem';
import ClearStorage from '../assets/images/clear-storage.svg';

const SavedResults = () => {
  const { state } = useContext(DataContext);
  const { errorMessage, searchResponses } = state;

  const handleSearchResponses = () => {
    return (
      searchResponses &&
      searchResponses.map((result, i) => {
        return <SavedResultsItem key={`${result}-${i}`} movieTitle={result} />;
      })
    );
  };

  return (
    <div
      className={`b-saved-results ${
        errorMessage ? 'b-saved-results--hasError' : ''
      }`}
    >
      {errorMessage && (
        <div className="b-saved-results__error">{errorMessage}</div>
      )}
      <div className="b-saved-results__success">
        {searchResponses && searchResponses.length > 0 && (
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => clearStorage()}
          >
            <img
              className="b-saved-results__clear-icon"
              src={ClearStorage}
              alt="Clear Local Storage"
            />
          </button>
        )}
        {handleSearchResponses()}
      </div>
    </div>
  );
};

export default SavedResults;
