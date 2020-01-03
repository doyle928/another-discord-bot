const { request } = require("graphql-request");
const moment = require("moment");

function checkMembers(guild) {
  let memberCount = 0;
  guild.members.forEach(member => {
    if (!member.user.bot) memberCount++;
  });
  return memberCount;
}

module.exports = async (client, member, guild) => {
  let discordJoinDateDiff = moment.duration(
    moment(new Date().toISOString()).diff(
      moment(new Date(member.user.createdTimestamp).toISOString())
    )
  );

  let discordJoinDate = moment(
    new Date(member.user.createdTimestamp).toISOString()
  ).format("D MMM YYYY [at] H:mm");

  let blank_avatar = false,
    join_age = false;
  let url = "https://lulu-discord-bot.herokuapp.com/api";

  let query = `query {
      getServers {
        guild_id blank_avatar join_age
      }
    }`;
  try {
    let res = await request(url, query);
    console.log(res);
    res.getServers.map(async s => {
      console.log(s);

      if (s.guild_id === member.guild.id) {
        blank_avatar = s.blank_avatar;
        join_age = s.join_age;
        console.log(blank_avatar, join_age);
      }
    });
  } catch (err) {
    console.error(err);
  }

  if (blank_avatar) {
    if (member.user.avatarURL === null) {
      console.log("kicking");
      member
        .send(
          `Hey ! Thanks for joining Our Home ! Unfortunately we require discord accounts to have an avatar photo, sorry it is just to help keep bots from joining !\nYou can get a photo and try again though !!`
        )
        .then(() => {
          member.kick("no avatar photo !!");
        });
      return;
    }
  }
  if (join_age) {
    // if (
    //   discordJoinDateDiff._data.days < 7 &&
    //   discordJoinDateDiff._data.months < 1 &&
    //   discordJoinDateDiff._data.years < 1
    // ) {
    if (
      discordJoinDateDiff._data.days < 28 &&
      discordJoinDateDiff._data.months < 3 &&
      discordJoinDateDiff._data.years < 1
    ) {
      console.log("kicking");
      member
        .send(
          `Hey ! Thanks for joining Our Home ! Unfortunately we require discord accounts that are 7 days or older.\nYour account is was created on ${discordJoinDate} !`
        )
        .then(() => {
          member.kick("account was too young !!");
        });
      return;
    }
  }

  if (member.guild.id === "559560674246787087") {
    console.log("giving roles");
    let c = await member.guild.channels.get("561372938474094603");
    member
      .addRole("596016686331723785")
      .then(() => c.send(`**${member.user.username}** has joined the server !`))
      .catch(() =>
        c.send(
          `**${member.user.username}** has joined the server but i failed to give them the welcome to serveur role !`
        )
      );
    member.addRole("585353865575137281");
  }

  query = `mutation {
            addUser(guild_id: "${member.guild.id}", user_id: "${
    member.user.id
  }", join_date: "${member.joinedTimestamp}", strikes: ${0}) {
              guild_id user_id join_date strikes
            }
          }`;

  try {
    let res = await request(url, query);
  } catch (err) {
    console.error(err);
  }

  query = `mutation {
            addCount (guild_id: "${member.guild.id}", members: ${checkMembers(
    member.guild
  )}, timestamp: "${Date.now()}") {
              guild_id members timestamp
            }
          }`;

  try {
    await request(url, query);
  } catch (err) {
    console.error(err);
  }
};
