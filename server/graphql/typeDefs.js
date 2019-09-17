const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    user_id: String!
    join_date: String!
    strikes: Int!
  }
  type Count {
    members: Int!
    timestamp: String!
  }
  type Query {
    getUser(user_id: String!): User
    getUsers: [User]
    getCount: [Count]
  }
  type Mutation {
    addUser(user_id: String!, join_date: String!, strikes: Int!): User!
    addStrike(user_id: String!, strikes: Number!): User!
    addCount(members: Int!, timestamp: String!): Count!
  }
`;
