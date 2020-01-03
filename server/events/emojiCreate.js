module.exports = async (client, emoji) => {
  emoji.guild.channels.map(async c => {
    if (c.id === "617170232460443667") {
      let emote = "<";
      if (emoji.animated) {
        emote += "a";
      }
      emote += `:${emoji.name}:${emoji.id}>`;

      c.send("new emote !!");
      c.send(emote);
    }
  });
};
