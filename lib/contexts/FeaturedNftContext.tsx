import { 
  useContext, 
  createContext, 
  Dispatch, 
  SetStateAction, 
  ReactNode, 
  useState 
} from "react";

interface FeaturedNftContext {
  middleIndex: number;
  setMiddleIndex: Dispatch<SetStateAction<number>>;
}

export const FeaturedNftContext = createContext<FeaturedNftContext>({
  middleIndex: 0,
  setMiddleIndex: () => {}
});

export const FeaturedNftContextProvider = ({ children }: { children: ReactNode }) => {
  const [middleIndex, setMiddleIndex] = useState(0);

  return (
    <FeaturedNftContext.Provider value={{ middleIndex, setMiddleIndex }}>
      {children}
    </FeaturedNftContext.Provider>
  );
}

export const useFeaturedNftContext = () => useContext(FeaturedNftContext);