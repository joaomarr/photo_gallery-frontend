import gql from 'graphql-tag'

export default gql`
mutation refreshToken($refreshToken: String!) {
  refreshToken(refreshToken: $refreshToken) {
    token,
    refreshToken,
  }
}
`