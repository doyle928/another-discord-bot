const active = new Map();
const talkedRecently = new Set();
let messageCounter = require("../data/messageCounter");
const timeConverterDMY = require("../data/timeConverterDMY");

module.exports = async (client, message) => {
  console.log(`${message.author.username}: ${message.content}`);
  if (message.guild.id) {
    let a = new Date();
    timeConverterDMY(a);
    let found = false;

    for (let i = 0; i < messageCounter.counts.length; i++) {
      if (messageCounter.counts[i].hasOwnProperty(message.guild.id)) {
        if (
          messageCounter.counts[i][message.guild.id].hasOwnProperty(
            message.channel.id
          )
        ) {
          if (
            messageCounter.counts[i][message.guild.id].day ===
            timeConverterDMY(a)
          ) {
            messageCounter.addCount(
              message.guild.id,
              message.channel.id,
              message.channel.name,
              timeConverterDMY(a),
              i
            );
          } else {
            //reset count and new day entry
            let oldDay = timeConverterDMY(a).split(" ");
            oldDay[0] = parseInt(oldday[0]) - 1;
            oldDay = `${oldDay[0]} ${oldDay[1]} ${oldDay[2]}`;
            messageCounter.newDay(
              message.guild.id,
              message.channel.id,
              message.channel.name,
              oldDay,
              timeConverterDMY(a),
              i
            );
          }
        } else {
          messageCounter.addChannel(
            message.guild.id,
            message.channel.id,
            message.channel.name,
            timeConverterDMY(a),
            i
          );
        }
        found = true;
      } else if (!found && i === messageCounter.counts.length - 1) {
        messageCounter.addGuild(
          message.guild.id,
          message.channel.id,
          message.channel.name,
          timeConverterDMY(a)
        );
      }
    }

    if (messageCounter.counts.length === 0) {
      messageCounter.addGuild(
        message.guild.id,
        message.channel.id,
        message.channel.name,
        timeConverterDMY(a)
      );
    }
  }

  let ops = {
    active: active
  };
  if (
    message.content.indexOf(client.config.prefix) !== 0 &&
    message.content.indexOf("Good") !== 0
  )
    return;
  // Our standard argument/command name definition.
  const args = message.content
    .slice(client.config.prefix.length)
    .trim()
    .split(/ +/g);
  let command = args
    .shift()
    .toLowerCase()
    .replace(/([.])/g, "");
  args.unshift(command);

  if (
    message.author.id === "159985870458322944" &&
    message.channel.id === "561401129296986112" &&
    command === "ood"
  ) {
    command = "good";
  } else if (
    message.author.id === "157673412561469440" &&
    message.channel.id === "574945031455244306" &&
    command === "ood"
  ) {
    command = "good";
  }
  console.log(
    `message.author: ${message.author.username} | command: ${command} | args: ${args}`
  );

  try {
    // Grab the command data from the client.commands Enmap
    const cmd = await client.commands.get(command);

    // If that command doesn't exist, silently exit and do nothing
    if (!cmd) return;

    if (talkedRecently.has(message.author.id)) {
      message.channel.send("So fast! Wait a moment please!");
    } else {
      // Run the command
      try {
        cmd.run(client, message, args, ops);
      } catch (err) {
        console.error(err);
      }

      // Adds the user to the set so that they can't talk for a minute
      talkedRecently.add(message.author.id);
      setTimeout(() => {
        // Removes the user from the set after a minute
        talkedRecently.delete(message.author.id);
      }, 1500);
    }
  } catch (err) {
    console.error(err);
  }
};
