import React, { createContext, useState, useMemo, ReactNode } from "react";
import { projectAPI } from "../api/projectAPI";
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

type ProjectsShort = {
  id: string;
  name: string;
};

type ProjectContextProviderProps = { children: ReactNode };
type TypeContext = {
  currentProject: Partial<IProject>;
  setCurrentProject: (c: Partial<IProject>) => void;
  projectsShort: ProjectsShort[];
  setProjectsShort: (c: ProjectsShort[]) => void;
  toggleCraPro: boolean;
  setToggleCraPro: (bool: boolean) => void;
};

const ProjectContext = createContext<TypeContext>({
  currentProject: initProject,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCurrentProject: () => {},
  projectsShort: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setProjectsShort: () => {},
  toggleCraPro: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setToggleCraPro: () => {},
});

export function ProjectContextProvider({
  children,
}: ProjectContextProviderProps) {
  const [currentProject, setCurrentProject] =
    useState<Partial<IProject>>(initProject);
  const [projectsShort, setProjectsShort] = useState<ProjectsShort[]>([]);
  const [toggleCraPro, setToggleCraPro] = useState<boolean>(false);

  const value = useMemo(
    () => ({
      currentProject,
      setCurrentProject,
      projectsShort,
      setProjectsShort,
      setToggleCraPro,
      toggleCraPro,
    }),
    [currentProject]
  );
  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
}

export default ProjectContext;
