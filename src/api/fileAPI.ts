import { api as graphQLApi } from "./_graphQL";
import { fileRequest } from "./fileRequest";
import { IFiles, FilesCodeData } from "../interfaces/IFile";

export type updateRes = {
  success: boolean;
};

type ResGetFilesAndCode = {
  getFilesByProjectId: IFiles[];
  getCodeFiles: FilesCodeData[];
};

export const fileAPI = {
  getAllFilesByProjectId: async (
    projectId: string
  ): Promise<ResGetFilesAndCode> => {
    try {
      const api = await graphQLApi();
      const allProjectFiles = (
        await api.query({
          query: fileRequest.getFilesByProjectId,
          variables: {
            projectId: projectId.toString(),
            getCodeFilesProjectId2: projectId.toString(),
          },
        })
      ).data as ResGetFilesAndCode;
      return allProjectFiles;
    } catch (err) {
      throw new Error("Erreur getAllFilesByProjectId");
    }
  },
  updateFileOnline: async (
    codeToPush: string,
    fileId: number,
    projectId: number
  ) => {
    try {
      const api = await graphQLApi();
      const { data } = await api.mutate({
        mutation: fileRequest.updateCodeFile,
        variables: {
          contentData: codeToPush,
          fileId: fileId,
          projectId: projectId,
        },
      });
      console.log("dataUpdate", data);
      return JSON.parse(data.updateCodeFile) as updateRes;
    } catch (err) {
      console.error(err);
    }
  },
};
