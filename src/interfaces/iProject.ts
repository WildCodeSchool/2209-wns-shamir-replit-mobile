import { ILike } from "./ILike";
import { IProjectShare } from "./IProjectShare";
import { IUserId } from "./iUser";

export type IProject = {
  id: string;
  id_storage_number: string;
  name: string;
  description: string;
  isPublic: boolean;
  like?: ILike[];
  projectShare?: IProjectShare[];
  nb_views: number;
  file: { language: string }[];
  userId?: Omit<IUserId, "email">;
};

export type CreateProject = {
  userId: number;
  name: string;
  description: string;
  isPublic: boolean;
};
