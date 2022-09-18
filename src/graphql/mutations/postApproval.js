import gql from 'graphql-tag'

export default gql`
mutation postApproval ($postId: ID!, $approve: Boolean!) {
  postApproval(postId: $postId, approve: $approve) {
    success,
    errors,
  }
}
`