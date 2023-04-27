import React, { createContext, useState, useMemo, ReactNode } from "react";
import { IProject } from "../interfaces/iProject";

type ProjectListContextProviderProps = { children: ReactNode };

const projectListInit: ProjectList = {
  owned: [],
  shared: [],
  public: [],
};

type ProjectList = {
  owned: IProject[];
  shared: IProject[];
  public: IProject[];
};

type TypeContext = {
  projectList: ProjectList;
  setProjectList: (c: ProjectList) => void;
};

const ProjectListContext = createContext<TypeContext>({
  projectList: projectListInit,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setProjectList: () => {},
});

export function ProjectListContextProvider({
  children,
}: ProjectListContextProviderProps) {
  const [projectList, setProjectList] = useState<ProjectList>(projectListInit);
  const value = useMemo(
    () => ({
      projectList,
      setProjectList,
    }),
    [projectList]
  );
  return (
    <ProjectListContext.Provider value={value}>
      {children}
    </ProjectListContext.Provider>
  );
}

export default ProjectListContext;
