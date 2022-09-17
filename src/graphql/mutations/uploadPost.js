import gql from 'graphql-tag'

export default gql`
mutation uploadPost ($file: Upload!) {
  uploadPost(file: $file) {
    success,
    errors,
  }
}
`