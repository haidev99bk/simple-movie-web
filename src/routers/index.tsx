import { createBrowserRouter } from "react-router-dom";
import MovieList from "../pages/MovieList";
import MovieDetails from "../pages/MovieDetails";

export const RouterPaths = {
  HOME: "/",
  MOVIE_LIST: "/movie-list",
  MOVIE_DETAILS: "/movie-details",
};

const router = createBrowserRouter([
  {
    path: RouterPaths.HOME,
    element: <div>Hello world!</div>,
  },
  {
    path: RouterPaths.MOVIE_LIST,
    element: <MovieList />,
  },
  {
    path: `${RouterPaths.HOME}/:movieId`,
    element: <MovieDetails />,
  },
  {
    path: "*",
    element: <div>not found</div>,
  },
]);

export default router;
