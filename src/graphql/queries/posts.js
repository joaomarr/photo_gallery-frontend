import gql from 'graphql-tag'

export default gql`
query posts ($id: ID) {
  posts(id: $id) {
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