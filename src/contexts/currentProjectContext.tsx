import React, { createContext, useState, useMemo, ReactNode } from "react";
import { IProject } from "../interfaces/iProject";
import { ExecutedCode } from "../api/executeCodeAPI";

type CurrentProjectContextProviderProps = { children: ReactNode };

const currentProjectInit: CurrentProjet = {};

type CurrentProjet = Partial<IProject> & {
  executionResult?: {
    result: ExecutedCode[];
    nbExecutions: number | undefined;
  };
};

type TypeContext = {
  currentProject: CurrentProjet;
  setCurrentProject: (c: CurrentProjet) => void;
};

const CurrentProjectContext = createContext<TypeContext>({
  currentProject: currentProjectInit,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCurrentProject: () => {},
});

export function CurrentProjectContextProvider({
  children,
}: CurrentProjectContextProviderProps) {
  const [currentProject, setCurrentProject] =
    useState<CurrentProjet>(currentProjectInit);
  const value = useMemo(
    () => ({
      currentProject,
      setCurrentProject,
    }),
    [currentProject]
  );
  return (
    <CurrentProjectContext.Provider value={value}>
      {children}
    </CurrentProjectContext.Provider>
  );
}

export default CurrentProjectContext;
