import gql from 'graphql-tag'

export default gql`
query meQuery {
  me {
    username,
    email,
    isFriend,
    isStaff,
    id,
  }
}
`