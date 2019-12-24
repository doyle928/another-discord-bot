exports.run = (client, message) => {
  if (message.author.id === "157673412561469440") {
    message.channel.send("pong");
  } else {
    message.channel.send("pong");
    setTimeout(() => {
      message.author.send("hey !");
      setTimeout(() => {
        message.author.send(`${message.author} ping !`);
        message.author.send("<:monoeil:658912400996827146>");
      }, 1800);
    }, 1000);
  }
};
