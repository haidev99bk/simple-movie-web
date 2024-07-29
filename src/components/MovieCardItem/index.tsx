import React from "react";
import { MovieListItem } from "../../service/movie.service";

interface MovieCardItemProps {
  movie: MovieListItem;
  onClick?: (id: string) => void;
}

const MovieCardItem = ({ movie, onClick }: MovieCardItemProps) => {
  const handleClick = () => {
    onClick && onClick(movie.imdbID);
  };

  return (
    <div
      className="rounded-2xl w-full max-w-[320px] md:w-[240px]  flex flex-col overflow-hidden shadow-[0px_2px_12px_0px_rgba(229,9,20,0.4)] hover:cursor-pointer"
      key={movie.Title}
      onClick={handleClick}
    >
      <div className="flex justify-center w-full">
        <img className="w-full h-[320px]" src={movie.Poster} alt="poster" />
      </div>
      <div className="py-4 px-2 text-center">
        <p className="text-base">{movie.Title}</p>
        <p className="text-sm mt-1">{`(${movie.Year})`}</p>
      </div>
    </div>
  );
};

export default MovieCardItem;
