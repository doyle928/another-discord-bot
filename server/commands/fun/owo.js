exports.run = async (client, message, args) => {
  if (!args[1]) {
    message.channel.fetchMessages({ limit: 2 }).then(m => {
      m.map(async msg => {
        if (msg.content !== message.content) {
          if (msg.author.id === "601825955572350976") {
            message.channel.send("sorry but i am not doing it to myself !");
          } else {
            let str = await editText(msg.content);
            message.channel.send(str.trim());
          }
        }
      });
    });
  } else {
    let msg = await editText(message.content);
    message.channel.send(msg.trim());
  }

  async function editText(message) {
    let newMsg = message
      .toLowerCase()
      .replace(".owo", "")
      .replace(/([l])/gi, "w")
      .replace(/([r])/gi, "w")
      .replace(/(ove)/gi, "uv")
      .replace(/(na)/gi, "nya")
      .replace(/(ne)/gi, "nye")
      .replace(/(no)/gi, "nyo")
      .replace(/(nu)/gi, "nyu")
      .replace(/([.])/gi, ",") //prevent the bot from calling commands
      .replace(/([!])/gi, "! <:owosneaky:677298912436027413> ");

    return newMsg;
  }
};
