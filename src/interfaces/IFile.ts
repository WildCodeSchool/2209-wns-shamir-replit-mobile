import { IUser } from "./iUser";

export type IFiles = {
  id: number;
  id_storage_file: string;
  name: string;
  language: string;
  userId?: IUser;
  projectId?: number;
};

export type FilesCodeData = {
  id: number;
  projectId: number;
  name: string;
  language: string;
  code: string;
};
