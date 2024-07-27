import BaseRequest from "./base";

const API_KEY = "b9bd48a6";

class MovieService extends BaseRequest {
  constructor() {
    super(import.meta.env.VITE_MOVIE_BASE_API);
  }

  searchMovies() {
    return this.instance.get(`?apikey=${API_KEY}&`);
  }
}

export default new MovieService();
