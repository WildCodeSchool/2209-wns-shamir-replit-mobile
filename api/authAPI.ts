import { api } from "./_graphQL";
import { authRequest } from "./authRequest";

type LoadTokenProps = {
  email: string;
  password: string;
};

export const authAPI = {
  connect: async ({ email, password }: LoadTokenProps) => {
    try{
      const { data } = await api.query({
        query: authRequest.GET_TOKEN,
        variables: {
          password,
          email,
        },
      });
      return data.getToken;
    }catch(err){
      console.log("err connect",err);
    }
  },
};
