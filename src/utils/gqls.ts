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

export const GQL_GET_USER_BY_ID = gql`
  query MyQuery($id: uuid!) {
    user_by_pk(id: $id) {
      email
      id
      name
    }
  }
`
