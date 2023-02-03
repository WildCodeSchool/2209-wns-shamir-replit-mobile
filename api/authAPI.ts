// Fichier d'API pour la gestion de l'authentification

import { api } from "./_graphQL";
import { authRequest } from "./authRequest";

type LoadTokenProps = {
  email: string;
  password: string;
};

type GetTokenReturn = {
  token: string;
  userId: number;
};

export const authAPI = {
  connect: async ({
    email,
    password,
  }: LoadTokenProps): Promise<GetTokenReturn | undefined> => {
    try {
      console.log(email, password);
      const { token, userId } = JSON.parse(
        (
          await api.query({
            query: authRequest.GET_TOKEN,
            variables: {
              password,
              email,
            },
          })
        ).data.getToken
      ) as GetTokenReturn;

      return { token, userId };
    } catch (err) {
      console.log("err connect", err);
    }
  },
};

// export const authAPI = {
//   connect: async ({ email, password }: LoadTokenProps) => {
//     try {
//       const  data  = await api.query({
//         query: authRequest.GET_TOKEN,
//         variables: {
//           password,
//           email,
//         },
//       });
//       console.log(data)
//       return data;
//     } catch (err) {
//       console.log("err connect", err);
//     }
//   },
// };
