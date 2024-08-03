import { MovieDetails } from "../../service/movie.service";

interface MovieDetailsCardProps {
  movieDetails: MovieDetails;
}

const MovieDetailsCard = ({ movieDetails }: MovieDetailsCardProps) => {
  return (
    <div>
      <h1 className="font-bold text-3xl text-white">{movieDetails.Title}</h1>
      <div className="md:flex md:p-5">
        <div className="flex justify-center w-full mr-5 max-h-[70vh] overflow-auto md:flex-1 md:justify-end md:rounded-none">
          <img
            className="md:object-contain md:object-right mt-2 object-fill object-center"
            src={movieDetails.Poster}
            alt="poster"
          />
        </div>

        <div className="md:flex-1 flex flex-col  gap-2 mt-4 w-full">
          <div className="flex gap-2 items-start">
            <div className="text-white min-w-fit">Released:</div>
            <div>{movieDetails.Released}</div>
          </div>

          <div className="flex gap-2 items-start">
            <div className="text-white min-w-fit">Awards :</div>
            <div>{movieDetails.Awards}</div>
          </div>

          <div className="flex gap-2 items-start">
            <div className="text-white min-w-fit">Language :</div>
            <div>{movieDetails.Language}</div>
          </div>

          <div className="flex gap-2 items-start">
            <div className="text-white min-w-fit">Country :</div>
            <div>{movieDetails.Country}</div>
          </div>

          <div className="flex gap-2 items-start">
            <div className="text-white min-w-fit">Actors :</div>
            <div className="text-wrap">{movieDetails.Actors}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsCard;
