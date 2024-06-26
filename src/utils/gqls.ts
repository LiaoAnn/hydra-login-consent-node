import gql from "graphql-tag"

export const GQL_CREATE_USER = gql`
  mutation MyMutation($nickname: String!, $password: String!, $account: String!) {
    insert_users(objects: { nickname: $nickname, password: $password, account: $account }) {
      returning {
        id
      }
    }
  }
`

export const GQL_GET_USER_BY_ACCOUNT = gql`
  query MyQuery($account: String!) {
    users(where: { account: { _eq: $account } }) {
      id
      account
      password
    }
  }
`

export const GQL_GET_USER_BY_ID = gql`
  query MyQuery($id: bigint!) {
    users_by_pk(id: $id) {
      account
      id
      nickname
    }
  }
`
