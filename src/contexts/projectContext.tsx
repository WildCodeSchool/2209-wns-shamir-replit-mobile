import React, { createContext, useState, useMemo, ReactNode } from "react";
import { IProject } from "../interfaces/iProject";

const initProject: Partial<IProject> = {
  id: undefined,
  id_storage_number: undefined,
  name: undefined,
  description: undefined,
  isPublic: undefined,
  like: [],
  nb_views: undefined,
  file: [],
};

type ProjectContextProviderProps = { children: ReactNode };
type TypeContext = {
  project: Partial<IProject>;
  setProject: (c: Partial<IProject>) => void;
};

const ProjectContext = createContext<TypeContext>({
  project: initProject,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setProject: () => {},
});

export function ProjectContextProvider({
  children,
}: ProjectContextProviderProps) {
  const [project, setProject] = useState<Partial<IProject>>(initProject);
  const value = useMemo(
    () => ({
      project,
      setProject,
    }),
    [project]
  );
  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
}

export default ProjectContext;
