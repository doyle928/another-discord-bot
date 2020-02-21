const Discord = require("discord.js");
const Canvas = require("canvas");
const snekfetch = require("snekfetch");
const Jimp = require("jimp");
const sizeOf = require("buffer-image-size");

exports.run = async (client, message, args) => {
  message.channel.startTyping();

  if (message.attachments.first()) {
    let pixelSize = 3;
    if (args[1]) pixelSize = Number(args[1]) > 10 ? 10 : Number(args[1]);
    if (args[1]) pixelSize = Number(args[1]) < 1 ? 1 : Number(args[1]);
    pixelImg(
      message.attachments.first().url,
      message.attachments.first().width,
      message.attachments.first().height,
      pixelSize
    );
  } else {
    if (args[1]) {
      if (
        args[1].replace(/([^0-9])/g, "").length === 17 ||
        args[1].replace(/([^0-9])/g, "").length === 18 ||
        args[1].replace(/([^0-9])/g, "").length === 19
      )
        message.channel
          .fetchMessage(args[1].replace(/([^0-9])/g, ""))
          .then(async m => {
            if (m.attachments.first()) {
              let pixelSize = 3;
              if (args[2])
                pixelSize = Number(args[2]) > 10 ? 10 : Number(args[2]);
              if (args[2])
                pixelSize = Number(args[2]) < 1 ? 1 : Number(args[2]);
              pixelImg(
                m.attachments.first().url,
                m.attachments.first().width,
                m.attachments.first().height,
                pixelSize
              );
            } else {
              return message.channel
                .send("there is no photo with this message silly !")
                .then(() => message.channel.stopTyping(true));
            }
          })
          .catch(() =>
            message.channel
              .send("sorry but i cannot find this message in this channel !")
              .then(() => message.channel.stopTyping(true))
          );
    } else {
      let foundPhoto = false;
      message.channel.fetchMessages({ limit: 3 }).then(async messages => {
        await Promise.all(
          messages.map(async m => {
            if (m.attachments.first() && !foundPhoto) {
              let pixelSize = 3;
              if (args[1])
                pixelSize = Number(args[1]) > 10 ? 10 : Number(args[1]);
              if (args[1])
                pixelSize = Number(args[1]) < 1 ? 1 : Number(args[1]);
              pixelImg(
                m.attachments.first().url,
                m.attachments.first().width,
                m.attachments.first().height,
                pixelSize
              );
              foundPhoto = true;
            }
          })
        );
        if (!foundPhoto) {
          return message.channel
            .send(
              "sorry but i cannot find any photos before the command ! just a heads up i only look in 2 messages above yours ! you can always give me the message id and use me like **.watercolour 679873905745199146** !!"
            )
            .then(() => message.channel.stopTyping(true));
        }
      });
    }
  }
  async function startCanvas(buffer, width, height) {
    const canvas = Canvas.createCanvas(width, height);

    const ctx = canvas.getContext("2d");

    const background = await Canvas.loadImage(buffer);

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    let img = canvas.toBuffer();
    const attachment = new Discord.Attachment(img, "watercolour.png");
    message.channel
      .send(attachment)
      .then(() => message.channel.stopTyping(true));
  }

  function pixelImg(bufferURL, width, height, pixelSize) {
    message.channel.send(
      "this is a big image so give me a seconde please !! <:softheart:575053165804912652>"
    );
    Jimp.read({
      url: bufferURL
    })
      // Jimp.read(buffer)
      .then(async image => {
        if (width >= height) image.resize(600, Jimp.AUTO, Jimp.RESIZE_HERMITE);
        else image.resize(Jimp.AUTO, 600, Jimp.RESIZE_HERMITE);
        image.pixelate(pixelSize);
        let bufferImg = await image.getBufferAsync(Jimp.AUTO);
        let dimensions = sizeOf(bufferImg);
        return startCanvas(bufferImg, dimensions.width, dimensions.height);
      })
      .catch(err => {
        message.channel
          .send("help i broke something !")
          .then(() => message.channel.stopTyping(true));
        return console.error(err);
      });
  }
};
