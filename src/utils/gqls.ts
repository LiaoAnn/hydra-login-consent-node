import gql from "graphql-tag"

export const GQL_CREATE_USER = gql`
  mutation MyMutation($name: String!, $password: String!, $email: String!) {
    insert_user(objects: { name: $name, password: $password, email: $email }) {
      returning {
        id
      }
    }
  }
`

export const GQL_GET_USER_BY_EMAIL = gql`
  query MyQuery($email: String!) {
    user(where: { email: { _eq: $email } }) {
      id
      email
      password
    }
  }
`