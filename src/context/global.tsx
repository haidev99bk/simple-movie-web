import { createContext } from "react";

export const defaultGlobalContextValue = {
  globalValue: {
    loading: false,
  },
};

export type GlobalContextType = {
  globalValue: {
    loading: boolean;
  };
  globalAction?: {
    setLoading: (loading: boolean) => void;
  };
};

const GlobalContext = createContext<GlobalContextType>(
  defaultGlobalContextValue
);

export default GlobalContext;
