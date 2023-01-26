import { gql } from "@apollo/client";

const authRequest = {
  GET_TOKEN: gql`
    query Query($password: String!, $email: String!) {
      getToken(password: $password, email: $email)
    }
  `,
  CREATE_USER: gql`
    mutation Mutation($password: String!, $login: String! $email: String!) {
      createUser(password: $password,login: $login ,email: $email) {
        id
        login
      }
    }
  `,
};

export { authRequest };
