import React, { useEffect } from "react";
import movieService from "../../service/movie.service";

const MovieList = () => {
  useEffect(() => {
    movieService.searchMovies();
  }, []);

  return <div className="font-helveticaNeue">MovieList</div>;
};

export default MovieList;
