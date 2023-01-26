import { api } from "./_graphQL";
import { useQuery, useMutation } from "@apollo/client";
import { CreateUser, IUser } from "../interfaces/iUser";
import { authRequest } from "./authRequest";

type LoadTokenProps = {
  email: string;
  password: string;
};

export const authAPI = {
  login: async ({ email, password }: LoadTokenProps) => {
    const { loading, error, data } = useQuery(authRequest.GET_TOKEN, {
      variables: {
        email: email,
        password: password,
      },
      onCompleted(data: any) {
        console.log(data.getToken);
        localStorage.setItem("token", data.getToken);
      },
      onError(error: any) {
        console.log("Err", error);
      },
    });
    console.log("login data: ", data);
    return data;
  },
  createUser: async (user: Partial<CreateUser>): Promise<IUser> => {
    const newUser = (
      await api.mutate({
        // mutation à refaire lorsque le back sera OP
        mutation: authRequest.CREATE_USER,
        variables: {
          user: {
            email: user.email,
            login: user.login,
            password: user.password,
          },
        },
      })
    ).data.createUser as IUser;

    return { ...newUser, id: newUser.id.toString() };
  },
};
