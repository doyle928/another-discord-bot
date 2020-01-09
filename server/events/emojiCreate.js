module.exports = async (client, emoji) => {
  if (emoji.guild.id === "559560674246787087") {
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
  } else if (emoji.guild.id === "664351758344257537") {
    emoji.guild.channels.map(async c => {
      if (c.id === "664357126784942080") {
        let emote = "<";
        if (emoji.animated) {
          emote += "a";
        }
        emote += `:${emoji.name}:${emoji.id}>`;

        c.send("new emote !!");
        c.send(emote);
      }
    });
  }
};
