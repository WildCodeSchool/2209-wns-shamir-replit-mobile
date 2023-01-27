import { createContext, useState, useMemo, ReactNode } from "react";

type IsLoggedContextProviderProps = { children: ReactNode };
type TypeContext = {
  isLogged: boolean;
  setIsLogged: (c: boolean) => void;
};

const IsLoggedContext = createContext<TypeContext>({
  isLogged: false,
  setIsLogged: () => {},
});

export function IsLoggedContextProvider({
  children,
}: IsLoggedContextProviderProps) {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const value = useMemo(
    () => ({
      isLogged,
      setIsLogged,
    }),
    [isLogged]
  );
  return (
    <IsLoggedContext.Provider value={value}>
      {children}
    </IsLoggedContext.Provider>
  );
}

export default IsLoggedContext;
