const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    guild_id: String!
    user_id: String!
    join_date: String!
    strikes: Int
    booster: Boolean!
    welcome_points: Int!
    temp_role: String
  }
  type Count {
    guild_id: String!
    members: Int!
    timestamp: String!
  }
  type Server {
    guild_id: String!
    blank_avatar: Boolean
    join_age: Boolean
  }
  type Default {
    guild_id: String!
    channel_id: String!
    mod_channel_id: String!
    user_id: String!
  }
  type Message {
    guild_id: String!
    channel_id: String!
    channel_name: String!
    message_count: Int!
    day: String!
  }
  type Ship {
    guild_id: String
    user_id: String
    ship_id: String
    timestamp: String
  }
  type Schedules {
    guild_id: String
    channel_id: String
    user_id: String
    dm_user: Boolean
    message: String
    date: String
  }
  type Boosterroles {
    guild_id: String
    user_id: String
    role_id: String
  }
  type Query {
    getUser(guild_id: String!, user_id: String!): User
    getUsers: [User]
    getCount(guild_id: String!): [Count]
    getCounts: [Count]
    getServers: [Server]
    getDefaults: [Default]
    getMessages(guild_id: String!): [Message]
    getMessage(guild_id: String!, channel_id: String!, day: String!): Message!
    getShips(guild_id: String!): [Ship]
    getShip(guild_id: String!, user_id: String!): Ship
    getSchedules: [Schedules]
    getBoosterroles: [Boosterroles]
  }
  type Mutation {
    addUser(
      guild_id: String!
      user_id: String!
      join_date: String!
      strikes: Int!
      booster: Boolean!
      welcome_points: Int!
    ): User!
    addStrike(guild_id: String!, user_id: String!, strikes: Int): User!
    setBooster(guild_id: String!, user_id: String!, booster: Boolean): User!
    addWelcomePoints(
      guild_id: String!
      user_id: String!
      welcome_points: Int
    ): User!
    setTempRole(guild_id: String!, user_id: String!, temp_role: String): User
    addCount(guild_id: String!, members: Int!, timestamp: String!): Count!
    addServer(
      guild_id: String!
      blank_avatar: Boolean!
      join_age: Boolean!
    ): Server!
    setJoinAge(guild_id: String!, join_age: Boolean): Server
    setBlankAvatar(guild_id: String!, blank_avatar: Boolean): Server
    setDefault(
      guild_id: String!
      channel_id: String!
      mod_channel_id: String!
      user_id: String!
    ): Default
    addMessage(
      guild_id: String!
      channel_id: String!
      channel_name: String!
      message_count: Int!
      day: String!
    ): Message!
    updateMessage(
      guild_id: String!
      channel_id: String!
      channel_name: String!
      message_count: Int
      day: String!
    ): Message!
    addShip(
      guild_id: String
      user_id: String
      ship_id: String
      timestamp: String
    ): Ship
    deleteShip(guild_id: String, user_id: String): Ship
    addSchedules(
      guild_id: String
      channel_id: String
      user_id: String
      dm_user: Boolean
      message: String
      date: String
    ): Schedules
    deleteSchedules(guild_id: String, message: String, date: String): Schedules
    addBoosterroles(
      guild_id: String
      user_id: String
      role_id: String
    ): Boosterroles
    deleteBoosterroles(role_id: String): Boosterroles
  }
`;
