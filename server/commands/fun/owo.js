exports.run = async (client, message, args) => {
  if (!args[1]) {
    message.channel.fetchMessages({ limit: 2 }).then(m => {
      m.map(async msg => {
        if (msg.content !== message.content) {
          let str = await editText(msg.content);
          message.channel.send(str);
        }
      });
    });
  } else {
    let msg = await editText(message.content);
    message.channel.send(msg);
  }

  async function editText(message) {
    let newMsg = message
      .toLowerCase()
      .replace(".owo", "")
      .replace(/([l])/gi, "w")
      .replace(/([r])/gi, "w")
      .replace(/(ove)/gi, "uv");
    if (newMsg.indexOf("n") > -1) {
      let nIndex = newMsg.indexOf("n");
      let letterCheck = newMsg.charAt(nIndex + 1);
      if (
        letterCheck === "a" ||
        letterCheck === "e" ||
        letterCheck === "i" ||
        letterCheck === "o" ||
        letterCheck === "u"
      ) {
        newMsg =
          newMsg.substring(0, nIndex + 1) +
          "y" +
          newMsg.substring(nIndex + 1, newMsg.length);
      }
    }
    if (newMsg.indexOf("!") > -1) {
      let excIndex = newMsg.indexOf("!");
      newMsg =
        newMsg.substring(0, excIndex + 1) +
        " <:owosneaky:652314297644613632> " +
        newMsg.substring(excIndex + 1, newMsg.length);
    }
    return newMsg;
  }
};
