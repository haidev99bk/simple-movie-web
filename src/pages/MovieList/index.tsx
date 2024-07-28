import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import movieService, { MovieListItem } from "../../service/movie.service";
import Search from "../../components/Search";
import { throttle } from "lodash";
import LoadingMore from "../../components/LoadingMore";
import MovieCardItem from "../../components/MovieCardItem";

const MAX_PAGE = 100;

const MovieList = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [movieList, setMovieList] = useState<MovieListItem[]>([]);
  const [totalResultsFound, setTotalResultsFound] = useState<
    number | undefined
  >(0);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isTouchedTheEnd, setIsTouchedTheEnd] = useState(false);

  const moveListContainerRef = useRef<HTMLDivElement>(null);

  const onSearchChange = (title: string) => {
    setSearchTitle(title);
    setTotalResultsFound(undefined);
    setError("");
  };

  const onSearch = async (searchTitle: string, page = 1) => {
    if (searchTitle) {
      const result = await movieService.searchMovies(searchTitle, page);

      if (result?.Response === "False") {
        if (result?.Error) {
          setError(result.Error);
        }
      } else {
        if (result?.Search?.length > 0) {
          if (page > 1) {
            setMovieList((prev) => [...prev, ...result.Search]);
          } else {
            setMovieList([...result.Search]);
          }
        }

        if (result.totalResults) {
          setTotalResultsFound(Number(result.totalResults));
        }
      }

      setIsLoadingMore(false);
    }
  };

  const handleSearch = () => {
    onSearch(searchTitle, page);
  };

  async function handleLoadMore(
    isLoadingMore: boolean,
    searchTitle: string,
    page: number
  ) {
    if (page <= MAX_PAGE) {
      if (!isLoadingMore && searchTitle) {
        setIsLoadingMore(true);
        await onSearch(searchTitle, page + 1);

        setIsTouchedTheEnd(false);
        setPage((prev) => prev + 1);
      }
    }
    setIsTouchedTheEnd(false);
  }

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

  useEffect(() => {
    window.addEventListener("scroll", handleWindowScroll);

    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, [handleWindowScroll]);

  useEffect(() => {
    if (
      isTouchedTheEnd &&
      !isLoadingMore &&
      searchTitle &&
      totalResultsFound &&
      totalResultsFound > movieList.length
    ) {
      setIsTouchedTheEnd(false);
      handleLoadMoreThrottle(isLoadingMore, searchTitle, page);
    }
  }, [
    isTouchedTheEnd,
    isLoadingMore,
    searchTitle,
    page,
    totalResultsFound,
    movieList.length,
    handleLoadMoreThrottle,
  ]);

  return (
    <div className="px-5 text-[#999999]">
      <h1 className="text-center text-3xl">Movie List</h1>
      <div className="mt-6 mb-8 w-full">
        <Search
          value={searchTitle}
          placeHolder="Search for movies"
          onChange={onSearchChange}
          onSearch={handleSearch}
        />
        <div className="italic ml-2 mt-2 my-8 text-xs text-[#9999997d] font-sans">
          Input movie title( eg: "Spider man") then enter
        </div>
      </div>

      <div>
        {searchTitle && (
          <div>
            {movieList.length > 0 ? (
              <div>
                <div className="text-xl">{`Result for '${searchTitle}':`}</div>

                <div ref={moveListContainerRef} className="mt-2 grid gap-8">
                  {movieList.map((movie) => {
                    return <MovieCardItem key={movie.Title} movie={movie} />;
                  })}
                </div>

                {isLoadingMore && (
                  <div className="flex justify-center mt-2">
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
