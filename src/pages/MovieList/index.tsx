import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import movieService, { MovieListItem } from "../../service/movie.service";
import Search from "../../components/Search";
import { debounce, throttle } from "lodash";
import LoadingMore from "../../components/LoadingMore";
import MovieCardItem from "../../components/MovieCardItem";
import { SessionStorageKeys } from "../../constants/sessionStoreKeys";
import { RouterPaths } from "../../routers";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../context/global";

const MAX_PAGE = 100;

const MovieList = () => {
  const { globalAction } = useContext(GlobalContext);
  const navigate = useNavigate();

  const cached = useMemo(() => {
    const movieCache = sessionStorage.getItem(
      SessionStorageKeys.MOVIE_LIST_CACHE
    );
    return movieCache ? JSON.parse(movieCache) : undefined;
  }, []);

  const [searchTitle, setSearchTitle] = useState(cached.searchTitle || "");
  const [movieList, setMovieList] = useState<MovieListItem[]>(cached.movieList);
  const [totalResultsFound, setTotalResultsFound] = useState<
    number | undefined
  >(Number(cached.totalResultsFound) || 0);
  const [page, setPage] = useState(cached.page ? Number(cached.page) : 1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isTouchedTheEnd, setIsTouchedTheEnd] = useState(false);
  const [error, setError] = useState("");

  const moveListContainerRef = useRef<HTMLDivElement>(null);

  const cacheData = () => {
    sessionStorage.setItem(
      SessionStorageKeys.MOVIE_LIST_CACHE,
      JSON.stringify({
        movieList,
        searchTitle,
        totalResultsFound,
        page,
      })
    );
  };

  const clearCache = () => {
    sessionStorage.removeItem(SessionStorageKeys.MOVIE_LIST_CACHE);
  };

  const resetFoundData = () => {
    setMovieList([]);
    setTotalResultsFound(undefined);
    setError("");
    setPage(1);

    clearCache();
  };

  const onSearchChange = (title: string) => {
    setSearchTitle(title);

    resetFoundData();
  };

  const findMovie = async (
    searchTitle: string,
    page = 1,
    isLoadMore = false
  ) => {
    if (searchTitle) {
      try {
        const result = await movieService.searchMovies(searchTitle, page);

        if (result?.Response === "False") {
          if (result?.Error) {
            setError(result.Error);
          }
        } else {
          if (result?.Search?.length > 0) {
            const isFirstTime = page === 1;

            if (isFirstTime) {
              setMovieList([...result.Search]);
            } else {
              if (isLoadMore) {
                setMovieList((prev) => [...prev, ...result.Search]);
              }
            }
          }

          if (result.totalResults) {
            setTotalResultsFound(Number(result.totalResults));
          }
        }

        setIsLoadingMore(false);
        globalAction?.setLoading(false);
      } catch (err) {
        console.log("[searchMovies err]", err);
        setIsLoadingMore(false);
        globalAction?.setLoading(false);
      }
    }
  };

  const handleSearch = debounce(() => {
    globalAction?.setLoading(true);
    findMovie(searchTitle, page);
  }, 500);

  const handleDeleteSearch = () => {
    setSearchTitle("");
  };

  const onClickCard = (id: string) => {
    navigate(`${RouterPaths.MOVIE_DETAILS}/${id}`);
  };

  const handleLoadMore = async (
    isLoadingMore: boolean,
    searchTitle: string,
    page: number
  ) => {
    if (page <= MAX_PAGE) {
      if (!isLoadingMore && searchTitle) {
        setIsLoadingMore(true);
        await findMovie(searchTitle, page + 1, true);

        setIsTouchedTheEnd(false);
        setPage((prev: number) => prev + 1);
      }
    }
    setIsTouchedTheEnd(false);
  };

  const handleLoadMoreThrottle = useMemo(
    () => throttle(handleLoadMore, 2000),
    []
  );

  const handleWindowScroll = useCallback(() => {
    const isTouchedTheEnd =
      (moveListContainerRef.current as HTMLDivElement)?.offsetTop +
        (moveListContainerRef.current as HTMLDivElement)?.offsetHeight -
        (window.scrollY + window.innerHeight) <=
      20;

    if (isTouchedTheEnd) {
      setIsTouchedTheEnd(true);
    }
  }, []);

  // Add listener
  useEffect(() => {
    window.addEventListener("scroll", handleWindowScroll);

    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, [handleWindowScroll]);

  // Handle scroll to the end event
  useEffect(() => {
    if (
      isTouchedTheEnd &&
      !isLoadingMore &&
      searchTitle &&
      totalResultsFound &&
      totalResultsFound > movieList?.length
    ) {
      setIsTouchedTheEnd(false);
      handleLoadMoreThrottle(isLoadingMore, searchTitle, page);
    }
  }, [isTouchedTheEnd]);

  useEffect(() => {
    cacheData();
  }, [movieList, totalResultsFound]);

  return (
    <div className="px-5 text-[#999999]">
      <h1 className="text-center text-3xl">Movie List</h1>
      <div className="mt-6 mb-4 w-full">
        <Search
          value={searchTitle}
          placeHolder="Search for movies"
          onChange={onSearchChange}
          onSearch={handleSearch}
          onDelete={handleDeleteSearch}
        />
        <div className="italic ml-2 mt-2 my-8 text-xs text-[#9999997d] font-sans">
          Input movie title( eg: "Spider man") then enter
        </div>
      </div>

      <div>
        {searchTitle && (
          <div>
            {movieList?.length > 0 ? (
              <div>
                <div className="text-xl mb-2">{`Result for '${searchTitle}':`}</div>

                <div
                  ref={moveListContainerRef}
                  className="mt-2 flex flex-wrap justify-center gap-8"
                >
                  {movieList.map((movie) => {
                    return (
                      <MovieCardItem
                        key={movie.Title}
                        movie={movie}
                        onClick={onClickCard}
                      />
                    );
                  })}
                </div>

                {isLoadingMore && (
                  <div className="flex justify-center my-4">
                    <LoadingMore />
                  </div>
                )}
              </div>
            ) : (
              error && (
                <div>
                  <div className="text-xl">{`${error}`}</div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieList;
