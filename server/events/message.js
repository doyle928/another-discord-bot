const active = new Map();
const talkedRecently = new Set();

module.exports = async (client, message) => {
  let ops = {
    active: active
  };

  if (
    message.content.indexOf(client.config.prefix) !== 0 &&
    message.content.indexOf("good") !== 0
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
  }

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
