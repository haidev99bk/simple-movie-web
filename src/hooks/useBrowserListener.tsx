import { useEffect } from "react";

const useBrowserListener = (event: string, handler: (e: unknown) => void) => {
  useEffect(() => {
    window.addEventListener(event, handler);

    return () => {
      window.removeEventListener(event, handler);
    };
  }, []);
};

export default useBrowserListener;
