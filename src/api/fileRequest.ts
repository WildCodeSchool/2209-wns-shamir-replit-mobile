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
      $contentData: String!
      $fileId: Float!
      $projectId: Float!
    ) {
      updateCodeFile(
        contentData: $contentData
        fileId: $fileId
        projectId: $projectId
      )
    }
  `,
};

export { fileRequest };
