import { 
  useContext, 
  createContext, 
  Dispatch, 
  SetStateAction, 
  ReactNode, 
  useState 
} from "react";

interface SearchContext {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

export const SearchContext = createContext<SearchContext>({
  search: "",
  setSearch: () => {}
});

export const SearchContextProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState("");

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearchContext = () => useContext(SearchContext);