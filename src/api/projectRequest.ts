import { gql } from "@apollo/client";

const projectRequest = {
  create: gql`
    mutation CreateProject(
      $isPublic: Boolean!
      $description: String!
      $name: String!
    ) {
      createProject(
        isPublic: $isPublic
        description: $description
        name: $name
      ) {
        description
        like {
          id
          userId {
            id
            login
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
      }
    }
  `,
};

export { projectRequest };
