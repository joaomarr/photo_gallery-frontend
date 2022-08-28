import gql from 'graphql-tag'

export default gql`
mutation login ($email: String!, $password: String!) {
  tokenAuth(password: $password, email: $email) {
    token,
    refreshToken,
  }
}
`