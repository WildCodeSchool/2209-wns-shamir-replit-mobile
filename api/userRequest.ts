import { gql } from "@apollo/client";

const userRequest = {
  CREATE_USER: gql`
    mutation Mutation($password: String!, $login: String!, $email: String!) {
      createUser(password: $password, login: $login, email: $email) {
        id
      }
    }
  `,
};

export { userRequest };
