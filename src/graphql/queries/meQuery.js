import gql from 'graphql-tag'

export default gql`
query meQuery {
  me {
    firstName,
    lastName,
    username,
    email,
    isFriend,
    isStaff,
    id,
    pk,
  }
}
`