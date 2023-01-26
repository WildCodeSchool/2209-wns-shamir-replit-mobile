import { CreateUser, IUser } from "../interfaces/iUser";
import { userRequest } from "./userRequest";
import { api } from "./_graphQL";

export const userAPI = {
  createUser: async (user: Partial<CreateUser>): Promise<IUser> => {
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
};
