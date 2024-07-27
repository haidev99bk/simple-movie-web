import React, { useEffect } from "react";
import movieService from "../../service/movie.service";

const MovieList = () => {
  useEffect(() => {
    movieService.getMovies();
  }, []);

  return <div>MovieList</div>;
};

export default MovieList;
