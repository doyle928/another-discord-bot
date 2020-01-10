const active = new Map();
const talkedRecently = new Set();
const Discord = require("discord.js");

module.exports = async (client, message) => {
  // console.log(`${message.author.username}: ${message.content}`);

  if (
    message.author.id !== "157673412561469440" &&
    message.author.id !== "630573404352937996" &&
    message.nonce === null &&
    message.attachments.size <= 0 &&
    !message.author.bot &&
    message.guild // make sure it's a non-private messages
  ) {
    message.channel.send(`hey ${message.author} ! stop using a user bot !`);
    let messageEmbed = new Discord.RichEmbed()
      .setColor("#ff0000")
      .setAuthor("User bot detected")
      .setDescription(
        `Muted **${message.author.username}#${message.author.discriminator}** for using a user bot`
      );

    if (message.guild.id === "664351758344257537") {
      let c = await message.guild.channels.get("664364035386507274");
      c.send(messageEmbed);
      message.member.addRole("664383601248305173");
    } else if (message.guild.id === "559560674246787087") {
      let c = await message.guild.channels.get("561372938474094603");
      c.send(messageEmbed);
      message.member.addRole("586122632479375370");
    }
  }

  if (message.guild !== null) {
    // let a = new Date();
    // timeConverterDMY(a);
    // let found = false;

    // for (let i = 0; i < messageCounter.counts.length; i++) {
    //   if (messageCounter.counts[i].hasOwnProperty(message.guild.id)) {
    //     if (
    //       messageCounter.counts[i][message.guild.id].hasOwnProperty(
    //         message.channel.id
    //       )
    //     ) {
    //       if (
    //         messageCounter.counts[i][message.guild.id].day ===
    //         timeConverterDMY(a)
    //       ) {
    //         messageCounter.addCount(
    //           message.guild.id,
    //           message.channel.id,
    //           message.channel.name,
    //           timeConverterDMY(a),
    //           i
    //         );
    //       } else {
    //         //reset count and new day entry
    //         let oldDay = timeConverterDMY(a).split(" ");
    //         oldDay[0] = parseInt(oldDay[0]) - 1;
    //         oldDay = `${oldDay[0]} ${oldDay[1]} ${oldDay[2]}`;
    //         messageCounter.newDay(
    //           message.guild.id,
    //           message.channel.id,
    //           message.channel.name,
    //           oldDay,
    //           timeConverterDMY(a),
    //           i
    //         );
    //       }
    //     } else {
    //       messageCounter.addChannel(
    //         message.guild.id,
    //         message.channel.id,
    //         message.channel.name,
    //         timeConverterDMY(a),
    //         i
    //       );
    //     }
    //     found = true;
    //   } else if (!found && i === messageCounter.counts.length - 1) {
    //     messageCounter.addGuild(
    //       message.guild.id,
    //       message.channel.id,
    //       message.channel.name,
    //       timeConverterDMY(a)
    //     );
    //   }
    // }

    // if (messageCounter.counts.length === 0) {
    //   messageCounter.addGuild(
    //     message.guild.id,
    //     message.channel.id,
    //     message.channel.name,
    //     timeConverterDMY(a)
    //   );
    // }
    if (message.guild.id === "559560674246787087") {
      let messageSplit = message.content.split(" ");
      for (let i = 0; i < messageSplit.length; i++) {
        if (
          messageSplit[i].toLowerCase() === "fag" ||
          messageSplit[i].toLowerCase() === "faggot" ||
          messageSplit[i].toLowerCase() === "nigger"
        ) {
          message.author.ban().catch(() => message.delete());
        }
      }
      if (
        message.content.toLowerCase().indexOf("f a g") >= 0 ||
        message.content.toLowerCase().indexOf("f a g g o t") >= 0 ||
        message.content.toLowerCase().indexOf("n i g g e r") >= 0
      ) {
        message.author.ban().catch(() => message.delete());
      }
    }
    if (message.guild.id === "559560674246787087") {
      let msgCheckId = message.content
        .toLowerCase()
        .replace(/([^a-z^0-9])/g, "");
      if (
        msgCheckId.indexOf("157673412561469440") >= 0 &&
        message.author.id !== "326608951107911682"
      ) {
        // setTimeout(() => {
        //   message.delete();
        // }, 225);
        if (msgCheckId.indexOf("avatar") >= 0) {
          message.channel
            .awaitMessages(res => res.author.bot === true, {
              max: 1,
              time: 7000,
              errors: ["time"]
            })
            .then(collected => {
              setTimeout(() => {
                collected.first().delete();
              }, 225);
            })
            .catch(err => console.error(err));
        }
      }
      // if (
      //   message.content
      //     .toLowerCase()
      //     .replace(/([^a-z])/g, "")
      //     .indexOf("lulu") >= 0 ||
      //   message.content
      //     .toLowerCase()
      //     .replace(/([^a-z])/g, "")
      //     .indexOf("lewlew") >= 0 ||
      //   message.content
      //     .toLowerCase()
      //     .replace(/([^a-z])/g, "")
      //     .indexOf("lewdlewd") >= 0 ||
      //   message.content
      //     .toLowerCase()
      //     .replace(/([^a-z])/g, "")
      //     .indexOf("lewlewd") >= 0 ||
      //   message.content
      //     .toLowerCase()
      //     .replace(/([^a-z])/g, "")
      //     .indexOf("luul") >= 0 ||
      //   message.content
      //     .toLowerCase()
      //     .replace(/([^a-z])/g, "")
      //     .indexOf("loolo") >= 0 ||
      //   message.content
      //     .toLowerCase()
      //     .replace(/([^a-z])/g, "")
      //     .indexOf("lullu") >= 0
      // ) {
      //   if (message.author.id !== "326608951107911682") {
      //     setTimeout(() => {
      //       message.delete();
      //     }, 225);
      //   }
      // }
    }
  }

  if (
    message.channel.type === "dm" &&
    message.channel.id !== "644786761511206912" &&
    message.author.id !== "601825955572350976" &&
    message.author.id !== "157673412561469440"
  ) {
    let s = await client.guilds.get("542945080495833119");
    let me = await s.fetchMember("157673412561469440");
    me.send(`${message.author.username} - ${message.content}`);
    if (message.author.id !== "326608951107911682") {
      if (message.content.toLowerCase().replace(/([^a-z])/g, "") === "pong") {
        message.author.send("good bot");
        message.author.send("<a:pat:658917218452635658>");
      } else if (
        message.content
          .toLowerCase()
          .replace(/([^a-z])/g, "")
          .indexOf("iloveyou") >= 0 ||
        message.content.toLowerCase().replace(/([^a-z])/g, "") === "ily"
      ) {
        message.author.send("i love you too !");
        message.author.send("<a:numberHeart:658916574132043776>");
      } else if (
        message.content
          .toLowerCase()
          .replace(/([^a-z])/g, "")
          .indexOf("ihateyou") >= 0
      ) {
        message.author.send("i am telling my owner !!");
      }
      // } else {
      //   message.author.send("i said ping !!");
      // }
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
  if (
    message.author.id === "159985870458322944" &&
    message.channel.id === "664359168140115979" &&
    command === "ey"
  ) {
    command = "hey";
  } else if (
    message.author.id === "157673412561469440" &&
    message.channel.id === "664359168140115979" &&
    command === "ey"
  ) {
    command = "hey";
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

      // let roleArray = [];
      // message.guild
      //   .fetchMember(message.author.id)
      //   .then(m => roleArray.push(m._roles));
      // let foundRole = false;
      // for (let j = 0; j < roleArray.length; j++) {
      //   if (
      //     roleArray[j] === "561306625571553280" ||
      //     roleArray[j] === "559562042907033651" ||
      //     roleArray[j] === "590575697773330434"
      //   ) {
      //     foundRole = true;
      //   }
      // }
      // if (foundRole) {
      setTimeout(() => {
        // Removes the user from the set after a minute
        talkedRecently.delete(message.author.id);
      }, 1500);
      // } else {
      //   setTimeout(() => {
      //     // Removes the user from the set after a minute
      //     talkedRecently.delete(message.author.id);
      //   }, 45000);
      // }
    }
  } catch (err) {
    console.error(err);
  }
};
