// Ce fichier contient toutes les requêtes et mutations liées à l'authentification
import { gql } from "@apollo/client";

const authRequest = {
  GET_TOKEN: gql`
    query Query($password: String!, $email: String!) {
      getToken(password: $password, email: $email)
    }
  `,
};

export { authRequest };
