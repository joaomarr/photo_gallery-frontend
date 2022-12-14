import gql from 'graphql-tag'

export default gql`
mutation commentPost ($postId: ID!, $text: String!) {
  commentPost(postId: $postId, text: $text) {
    success,
    errors,
  }
}
`