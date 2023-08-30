// Ce fichier contient toutes les requêtes et mutations liées à l'utilisateur
import { gql } from "@apollo/client";

const userRequest = {
  CREATE_USER: gql`
    mutation Mutation($password: String!, $login: String!, $email: String!) {
      createUser(password: $password, login: $login, email: $email) {
        id
      }
    }
  `,
  GET_ALL_USERS: gql`
    query Query {
      getAllUsers {
        id
        email
        login
        date_end_subscription
        date_start_subscription
      }
    }
  `,
};

export { userRequest };
