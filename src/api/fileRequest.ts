import { gql } from "@apollo/client";

const fileRequest = {
  getFilesByProjectId: gql`
    query GetFilesByProjectId(
      $projectId: String!
      $getCodeFilesProjectId2: String!
    ) {
      getFilesByProjectId(projectId: $projectId) {
        id
        id_storage_file
        language
        name
      }
      getCodeFiles(projectId: $getCodeFilesProjectId2) {
        code
        id
        language
        name
        projectId
      }
    }
  `,
  updateCodeFile: gql`
    mutation UpdateCodeFile(
      $socketIds: String!
      $fileId: Float!
      $projectId: Float!
      $contentData: String!
    ) {
      updateCodeFile(
        socketIds: $socketIds
        fileId: $fileId
        projectId: $projectId
        contentData: $contentData
      )
    }
  `,
};

export { fileRequest };
