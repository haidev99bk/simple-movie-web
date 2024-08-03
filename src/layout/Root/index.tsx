import { useCallback, useState } from "react";
import { Outlet } from "react-router-dom";
import Logo from "../../assets/logo.png";
import MenuIcon from "../../assets/menu-icon.gif";
import GlobalContext from "../../context/global";
import { MovieListItem } from "../../service/movie.service";
import LoadingOverlay from "../../components/LoadingOverlay";
import ScrollTopIcon from "../../assets/scroll-top-icon.svg";
import useBrowserListener from "../../hooks/useBrowserListener";

const Root = () => {
  const [loading, setLoading] = useState(false);
  const [movieList, setMovieList] = useState<MovieListItem[]>([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  const globalValue = {
    loading,
    movieList,
    searchTitle,
  };

  const globalAction = {
    setLoading,
    setMovieList,
    setSearchTitle,
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = useCallback(() => {
    if (window.scrollY >= 200) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  }, []);

  useBrowserListener("scroll", handleScroll);

  return (
    <GlobalContext.Provider value={{ globalValue, globalAction }}>
      <div className="min-h-screen w-full bg-[#141414] text-[#999999] relative">
        {/* header */}
        <div className="flex w-full bg-[rgba(20,20,20,0.5)] fixed h-[50px] px-5 py-2">
          <div className="flex w-fit items-center gap-5">
            <div>
              <img className="h-6 w-6" src={MenuIcon} alt="menu-icon" />
            </div>
            <div>
              <img className="h-6" src={Logo} alt="logo" />
            </div>
          </div>
        </div>

        <div className="min-h-screen overflow-auto flex flex-col pt-[50px]">
          {/* body */}
          <div className="flex-1">
            <Outlet />
          </div>

          {/* footer */}
          <div className="flex gap-4 flex-wrap px-5 py-6">
            <span className="text-base">Terms of Use</span>
            <span className="text-base">Privacy Statement</span>
            <span className="text-base">Cookie Preferences</span>
            <span className="text-base">Help Center</span>
          </div>

          {showScrollTop && (
            <div
              onClick={scrollToTop}
              className="fixed bottom-10 right-4 hover:cursor-pointer hover:opacity-100 w-16 h-16 rounded-full opacity-60 bg-[#e50914]"
            >
              <img src={ScrollTopIcon} alt="scroll-top" />
            </div>
          )}

          {loading && <LoadingOverlay />}
        </div>
      </div>
    </GlobalContext.Provider>
  );
};

export default Root;
