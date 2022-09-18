import gql from 'graphql-tag'

export default gql`
query posts ($id: ID, $isApproved: Boolean) {
  posts(id: $id, isApproved: $isApproved) {
    edges {
        node {
            id,
            isApproved,
            createdAt,
            likes {
              id,
            },
            commentSet {
              edges {
                node {
                  owner {
                    username
                  },  
                  text,
                  created,
                  id,
                }
              }
            },
            owner {
              username,
            },
            file {
              file,
              id,
            },
        }
    }
  }
}
`