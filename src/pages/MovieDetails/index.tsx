import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import movieService, {
  MovieDetails as MovieDetailsType,
} from "../../service/movie.service";
import BackArrowIcon from "../../assets/back-arrow-navigation.svg";
import { RouterPaths } from "../../routers";
import MovieDetailsCard from "../../components/MovieDetailsCard";
import GlobalContext from "../../context/global";

const MovieDetails = () => {
  const { globalAction } = useContext(GlobalContext);
  const navigate = useNavigate();

  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState<MovieDetailsType | null>(
    null
  );
  const [error, setError] = useState("");

  const getDetails = async (movieId: string) => {
    globalAction?.setLoading(true);
    try {
      const result = await movieService.getMovieDetails(movieId as string);

      if (result.Response === "True") {
        setMovieDetails(result);
      } else {
        if (result.Error) {
          setError(result.Error);
        }
      }
      globalAction?.setLoading(false);
    } catch (err) {
      console.log("[getMovieDetails err]:", err);
      globalAction?.setLoading(false);
    }
  };

  useEffect(() => {
    if (movieId) getDetails(movieId as string);
  }, [movieId]);

  const backToList = () => {
    navigate(RouterPaths.HOME);
  };

  return (
    <div className="p-5">
      <div
        className="flex items-center gap-3 my-3 hover:cursor-pointer"
        onClick={backToList}
      >
        <img className="h-5" src={BackArrowIcon} alt="back-arrow" />
        <p className="font-medium text-xl">Back to the list</p>
      </div>
      {movieDetails ? (
        <MovieDetailsCard movieDetails={movieDetails} />
      ) : (
        <div className="mt-6 text-center">{error || ""}</div>
      )}
    </div>
  );
};

export default MovieDetails;
