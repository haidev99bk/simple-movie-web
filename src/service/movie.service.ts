import BaseRequest from "./base";

const API_KEY = "b9bd48a6";

export interface MovieListResponse {
  Search: MovieListItem[];
  totalResults: string;
  Response: "True" | "False";
  Error?: string;
}

export interface MovieListItem {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

class MovieService extends BaseRequest {
  constructor() {
    super(import.meta.env.VITE_MOVIE_BASE_API);
  }

  searchMovies(title: string, page: number) {
    return new Promise<MovieListResponse>((resolve, reject) => {
      this.instance
        .get(`?apikey=${API_KEY}&s=${encodeURI(title)}&page=${page}`)
        .then((result) => {
          resolve(result.data);
        })
        .catch((err) => reject(err));
    });
  }
}

export default new MovieService();
