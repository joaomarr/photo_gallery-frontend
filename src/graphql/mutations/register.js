import gql from 'graphql-tag'

export default gql`
mutation register (
    $email: String!,
    $password1: String!,
    $password2: String!,
    $firstName: String,
    $lastName: String,
    $username: String
    ) {
  register(
    password1: $password1,
    password2: $password2,
    email: $email,
    firstName: $firstName,
    lastName: $lastName,
    username: $username,
    ) {
    token,
    refreshToken
  }
}
`