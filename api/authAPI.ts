import { api } from "./_graphQL";
import { authRequest } from "./authRequest";

type LoadTokenProps = {
  email: string;
  password: string;
};

export const authAPI = {
  connect: async ({ email, password }: LoadTokenProps) => {
    const { data, error } = await api.query({
      query: authRequest.GET_TOKEN,
      variables: {
        password,
        email,
      },
    });
    return data.getToken;
  },
};
