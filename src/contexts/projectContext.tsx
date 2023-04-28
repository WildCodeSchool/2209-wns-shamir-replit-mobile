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
  currentProject: Partial<IProject>;
  setCurrentProject: (c: Partial<IProject>) => void;
  projectsShort: IProject[];
  setProjectsShort: (c: IProject[]) => void;
};

const ProjectContext = createContext<TypeContext>({
  currentProject: initProject,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCurrentProject: () => {},
  projectsShort: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setProjectsShort: () => {},
});

export function ProjectContextProvider({
  children,
}: ProjectContextProviderProps) {
  const [currentProject, setCurrentProject] =
    useState<Partial<IProject>>(initProject);
  const [projectsShort, setProjectsShort] = useState<IProject[]>([]);

  const value = useMemo(
    () => ({
      currentProject,
      setCurrentProject,
      projectsShort,
      setProjectsShort,
    }),
    [currentProject, projectsShort]
  );
  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
}

export default ProjectContext;
