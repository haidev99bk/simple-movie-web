import { createBrowserRouter } from "react-router-dom";
import MovieList from "../pages/MovieList";
import MovieDetails from "../pages/MovieDetails";
import ErrorPage from "../pages/ErrorPage";
import Root from "../layout/Root";

export const RouterPaths = {
  HOME: "/",
  MOVIE_DETAILS: "/movie-details",
};

const router = createBrowserRouter([
  {
    path: RouterPaths.HOME,
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <MovieList />,
      },
      {
        path: `${RouterPaths.MOVIE_DETAILS}/:movieId`,
        element: <MovieDetails />,
      },
    ],
  },
]);

export default router;
