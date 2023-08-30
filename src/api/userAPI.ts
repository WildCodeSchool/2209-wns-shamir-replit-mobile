// Description: API for user
import { CreateUser, IUser } from "../interfaces/iUser";
import { userRequest } from "./userRequest";
import { api as graphQlApi } from "./_graphQL";

export const userAPI = {
  createUser: async (user: Partial<CreateUser>): Promise<IUser> => {
    const api = await graphQlApi();

    const newUser = (
      await api.mutate({
        // mutation à refaire lorsque le back sera OP
        mutation: userRequest.CREATE_USER,
        variables: {
          email: user.email,
          login: user.login,
          password: user.password,
        },
      })
    ).data.createUser as IUser;

    return { ...newUser, id: newUser.id.toString() };
  },
  getAll: async (): Promise<IUser[]> => {
    const api = await graphQlApi();
    const users = (
      await api.query({
        query: userRequest.GET_ALL_USERS,
      })
    ).data.getAllUsers as IUser<string>[];

    return users.map((user) => ({
      ...user,
      id: user.id.toString(),
      date_start_subscription: user.date_start_subscription
        ? new Date(user.date_start_subscription)
        : undefined,
      date_end_subscription: user.date_end_subscription
        ? new Date(user.date_end_subscription)
        : undefined,
    }));
  },
};
