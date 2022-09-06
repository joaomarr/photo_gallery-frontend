import gql from 'graphql-tag'

export default gql`
query posts ($id: ID) {
  posts(id: $id) {
    edges {
        node {
            id,
            isApproved,
            file {
              file,
              id
            },
        }
    }
  }
}
`