const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    guild_id: String!
    user_id: String!
    join_date: String!
    strikes: Int
  }
  type Count {
    guild_id: String!
    members: Int!
    timestamp: String!
  }
  type Server {
    guild_id: String!
  }
  type Query {
    getUser(guild_id: String!, user_id: String!): User!
    getUsers: [User]
    getCount: [Count]
    getServers: [Server]
  }
  type Mutation {
    addUser(
      guild_id: String!
      user_id: String!
      join_date: String!
      strikes: Int!
    ): User!
    addStrike(guild_id: String!, user_id: String!, strikes: Int): User!
    addCount(guild_id: String!, members: Int!, timestamp: String!): Count!
    addServer(guild_id: String!): Server!
  }
`;
