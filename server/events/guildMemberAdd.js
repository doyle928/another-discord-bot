const { request } = require("graphql-request");
const _ = require("lodash");
const mongoose = require("mongoose");
const axios = require("axios");

function checkMembers(guild) {
  let memberCount = 0;
  guild.members.forEach(member => {
    if (!member.user.bot) memberCount++;
  });
  return memberCount;
}

module.exports = async (client, member, guild) => {
  let newMember = [
    {
      members: checkMembers(member.guild),
      timestamp: Date.now()
    }
  ];

  axios({
    url: "https://github.com/doyle928/member-tracker-json",
    method: "get"
  }).then(res => {
    let json = JSON.parse(res);
    json.push(...newMember);
    axios({
      url: "https://github.com/doyle928/member-tracker-json",
      method: "post",
      data: json
    });
  });

  mongoose
    .connect(`${process.env.MONGODB_URI}${state}`, { useNewUrlParser: true })
    .then(async () => {
      console.log("DB connected");

      let members = await message.guild.fetchMembers();

      members.members.map(async mem => {
        let query = `mutation {
            addUser(user_id: "${member.user.id}", join_date: "${
          member.joinedTimestamp
        }", strikes: ${0}) {
              user_id join_date strikes
            }
          }`;
        let url = "https://lulu-discord-bot.herokuapp.com/api";
        try {
          let res = await request(url, query);
          console.log(res);
        } catch (err) {
          console.error(err);
        }
      });
    })
    .then(() => mongoose.disconnect())
    .catch(error => console.log(error));
};
