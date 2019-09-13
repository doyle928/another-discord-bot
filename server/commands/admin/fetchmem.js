const { request } = require("graphql-request");
const _ = require("lodash");
const mongoose = require("mongoose");

exports.run = async (client, message, args) => {
  if (message.author.id == "157673412561469440") {
    let guildId = message.guild.id.toString();
    state = `server_${guildId}`;

    // let createTableQuery = `create table if not exists server_${guildId}(
    //     id serial PRIMARY KEY,
    //          user_id varchar(25) UNIQUE NOT NULL,
    //          join_date varchar(25) NOT NULL,
    //          strikes int
    //        )`;
    // try {
    //   let res = await db.result(createTableQuery);
    //   console.log(res);
    // } catch (err) {
    //   console.error();
    // }

    mongoose
      .connect(`${process.env.MONGODB_URI}${state}`, { useNewUrlParser: true })
      .then(() => console.log("DB connected"))
      .catch(error => console.log(error));

    let members = await message.guild.fetchMembers();

    members.members.map(async mem => {
      let query = `mutation {
        addUser(user_id: "${mem.user.id}", join_date: "${
        mem.joinedTimestamp
      }", strikes: ${0}) {
          user_id join_date strikes
        }
      }`;
      let url = "https://lulu-discord-bot.herokuapp.com/api";
      try {
        let res = await request(url, query);
        console.log("chart", res);
      } catch (err) {
        console.error("chart error:", err);
      }
    });
    mongoose.disconnect();
  }
};
