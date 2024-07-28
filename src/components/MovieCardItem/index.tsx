import React from "react";
import { MovieListItem } from "../../service/movie.service";

interface MovieCardItemProps {
  movie: MovieListItem;
}

const MovieCardItem = ({ movie }: MovieCardItemProps) => {
  return (
    <div
      className="rounded-2xl flex flex-col overflow-hidden shadow-[0px_2px_12px_0px_rgba(229,9,20,0.4)]"
      key={movie.Title}
    >
      <img className="w-full" src={movie.Poster} alt="poster" />
      <div className="py-4 px-2 text-center">
        <p className="text-base">{movie.Title}</p>
        <p className="text-sm mt-1">{`(${movie.Year})`}</p>
      </div>
    </div>
  );
};

export default MovieCardItem;
