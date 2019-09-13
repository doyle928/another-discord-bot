const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    user_id: String!
    join_date: String!
    strikes: Int!
  }
  type Query {
    getUser(user_id: String!): User
    getUsers: [User]
  }
  type Mutation {
    addUser(user_id: String!, join_date: String!, strikes: Int!): User!
  }
`;
