import gql from 'graphql-tag'

export default gql`
query posts {
  posts {
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