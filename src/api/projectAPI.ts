import { api } from "./_graphQL";
import { IProject } from "../interfaces/iProject";
import { gql } from "@apollo/client";

export const projectAPI = {
  getProjectByUserId: async (userId: number): Promise<IProject[]> => {
    console.log("userid", userId);
    const projects = (
      await api.query({
        query: gql`
          query GetProjectByUserId($userId: Float!) {
            getProjectByUserId(userId: $userId) {
              id
              name
            }
          }
        `,
        variables: { userId },
      })
    ).data.getProjectByUserId as IProject[];
    console.log("projects API", projects);

    return projects;
  },
  getPublicProjects: async (): Promise<IProject[]> => {
    const projects = (
      await api.query({
        query: gql`
          query GetPublicProjects {
            getPublicProjects {
              name
            }
          }
        `,
      })
    ).data.getPublicProjects as IProject[];
    return projects;
  },
};
