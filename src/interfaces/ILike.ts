import { IUserId } from "./iUser";

export type ILike = {
  id: number;
  userId: Pick<IUserId, "id">;
};
