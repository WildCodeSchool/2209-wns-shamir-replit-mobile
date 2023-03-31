import { IUserId } from "./iUser";

export type IProjectShare = {
  id: number;
  userId: IUserId;
  comment: boolean;
  read: boolean;
  write: boolean;
};
