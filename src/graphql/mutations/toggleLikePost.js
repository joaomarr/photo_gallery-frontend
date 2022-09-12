import gql from 'graphql-tag'

export default gql`
mutation toggleLikePost ($postId: ID!) {
  toggleLikePost(postId: $postId) {
    success,
    errors,
  }
}
`