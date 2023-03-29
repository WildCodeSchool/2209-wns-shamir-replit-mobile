// Fichier d'API pour la gestion de l'authentification

import { api as graphQlApi } from "./_graphQL";
import { authRequest } from "./authRequest";

type LoadTokenProps = {
  email: string;
  password: string;
};

export const authAPI = {
  connect: async ({ email, password }: LoadTokenProps) => {
    try {
      const api = await graphQlApi();
      const { data } = await api.query({
        query: authRequest.GET_TOKEN,
        variables: {
          password,
          email,
        },
      });
      return JSON.parse(data.getToken);
    } catch (err) {
      console.error("err connect", err);
    }
  },
};
