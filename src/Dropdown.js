import { useState, useEffect } from "react";
import Characters from "./Characters";

function Dropdown() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [moviesList, setMovieList] = useState([]);

  useEffect(() => {
    fetch("https://swapi.dev/api/films")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          console.log(result.results);
          setMovieList(result.results);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  const MovieTitle = ({ title, crawl, characters }) => {
    // State for movie info display
    const [infoStatus, setInfoStatus] = useState(false);

    const displayInfo = () => {
      if (infoStatus === false) {
        setInfoStatus(true);
      } else {
        setInfoStatus(false);
      }
    };

    return (
      <>
        <h1 className="movies__title" onClick={displayInfo}>
          <span>{title}</span>
          <span>{infoStatus ? "v" : ">"}</span>
        </h1>
        {infoStatus && (
          <>
            <div className="movies__crawl">
              <h1 className="movies__openingCrawl">{crawl}</h1>
            </div>
            <Characters charactersData={characters} />
          </>
        )}
      </>
    );
  };

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div className="lds-dual-ring"></div>;
  } else {
    return (
      <div className="movies">
        {moviesList?.map((film) => (
          <MovieTitle
            key={film.episode_id}
            title={film.title}
            crawl={film.opening_crawl}
            characters={film.characters}
          />
        ))}
      </div>
    );
  }
}

export default Dropdown;
