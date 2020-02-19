const Discord = require("discord.js");
const musicHelper = require("../../data/musicHelper");
const randColour = require("../../data/randomColor");
const snekfetch = require("snekfetch");
const moment = require("moment");

exports.run = async (client, message, args) => {
  const serverQueue = musicHelper.musicQueue.get(message.guild.id);
  if (!serverQueue || serverQueue.songs.length === 0)
    return message.channel.send("There is nothing playing.");
  let currentSong = serverQueue.songs[0];

  console.log(currentSong);

  const { body: buffer } = await snekfetch.get(currentSong.thumbnail);

  let timeDiff = moment(new Date()).diff(
    currentSong.dateAdded,
    "seconds",
    false
  );
  console.log(timeDiff);

  let percentageOfSong = Math.floor(
    (timeDiff / currentSong.totalSecondes) * 15
  );

  let trackPosition = "";
  for (let i = 0; i < percentageOfSong; i++) {
    trackPosition += `─`;
  }
  trackPosition += "⦿";
  for (let i = 15; i > percentageOfSong; i--) {
    trackPosition += `─`;
  }

  let embed = new Discord.RichEmbed()
    .setAuthor("🎶 Now Playing")
    .attachFiles([{ name: "thumbnail.jpg", attachment: buffer }])
    .setThumbnail("attachment://thumbnail.jpg")
    .setColor(randColour())
    .setDescription(
      `**[► ${currentSong.title}](${currentSong.url})**\n|${trackPosition}|`
    )
    .addField("Channel", `${currentSong.channel}`, true)
    .addField("Duration", `${currentSong.duration}`, true)
    .addField("Requested by", `${currentSong.requesterUsername}`)
    .setFooter(message.guild.name)
    .setTimestamp();
  return message.channel.send(embed);
};
