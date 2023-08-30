import React, { createContext, useState, useMemo, ReactNode } from "react";
import { IUser } from "../interfaces/iUser";

const initUser: Partial<IUser> = {
  id: undefined,
  email: undefined,
  login: undefined,
  date_start_subscription: undefined,
  date_end_subscription: undefined,
};

type UserContextProviderProps = { children: ReactNode };
type TypeContext = {
  user: Partial<IUser>;
  setUser: (c: Partial<IUser>) => void;
};

const UserContext = createContext<TypeContext>({
  user: initUser,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: () => {},
});

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<Partial<IUser>>(initUser);
  const value = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user]
  );
  
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContext;
