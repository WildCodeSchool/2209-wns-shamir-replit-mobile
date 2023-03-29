import { api as graphQlApi } from "./_graphQL";
import { IProject } from "../interfaces/iProject";
import { gql } from "@apollo/client";

export const projectAPI = {
  getProjectByUserId: async (userId: number): Promise<IProject[]> => {
    const api = await graphQlApi();
    const projects = (
      await api.query({
        query: gql`
          query GetProjectByUserId($userId: Float!) {
            getProjectByUserId(userId: $userId) {
              description
              like {
                id
                userId {
                  id
                }
              }
              projectShare {
                userId {
                  login
                  email
                  id
                }
                id
                comment
                read
                write
              }
              id
              id_storage_number
              isPublic
              name
              nb_views
              userId {
                id
                login
              }
            }
          }
        `,
        variables: { userId },
      })
    ).data.getProjectByUserId as IProject[];

    return projects;
  },
  getPublicProjects: async (): Promise<IProject[]> => {
    const api = await graphQlApi();
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

  addView: async (rawProjectId: number | string): Promise<number> => {
    const projectId =
      typeof rawProjectId === "string" ? parseInt(rawProjectId) : rawProjectId;

    const api = await graphQlApi();

    const updatedProject = (
      await api.mutate({
        mutation: gql`
          mutation Mutation($projectId: Float!) {
            addView(projectId: $projectId) {
              nb_views
            }
          }
        `,
        variables: {
          projectId,
        },
      })
    ).data.addView as IProject[];

    return updatedProject[0]?.nb_views;
  },
};
