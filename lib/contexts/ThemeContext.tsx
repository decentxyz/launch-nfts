import { 
  useContext, 
  createContext, 
  Dispatch, 
  SetStateAction, 
  ReactNode, 
  useState 
} from "react";

interface Theme {
  dark: boolean;
  setDark: Dispatch<SetStateAction<boolean>>;
}

export const ThemeContext = createContext<Theme>({
  dark: false,
  setDark: () => true
});

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [dark, setDark] = useState(true);

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => useContext(ThemeContext);