import React from 'react';

const PLACEHOLDER_IMAGE = 'https://dummyimage.com/360x640/aaa/fff';

const Movie = ({ movie }) => {
  const { Poster, Title } = movie;

  return (
    <div className="b-movie">
      <div
        className="b-movie__poster"
        style={{
          backgroundImage: `url(${
            Poster === 'N/A' ? PLACEHOLDER_IMAGE : Poster
          })`,
        }}
      >
        <div className="b-movie__poster-overlay">
          <span className="b-movie__title">{Title}</span>
        </div>
      </div>
    </div>
  );
};

export default Movie;
