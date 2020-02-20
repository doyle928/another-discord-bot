const Discord = require("discord.js");
const Canvas = require("canvas");
const path = require("path");
const snekfetch = require("snekfetch");

exports.run = async (client, message, args) => {
  if (message.attachments.first()) {
    startCanvas(
      message.attachments.first().width,
      message.attachments.first().height,
      message.attachments.first().url
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
              startCanvas(
                m.attachments.first().width,
                m.attachments.first().height,
                m.attachments.first().url
              );
            } else {
              return message.channel.send(
                "there is no photo with this message silly !"
              );
            }
          })
          .catch(() =>
            message.channel.send(
              "sorry but i cannot find this message in this channel !"
            )
          );
    } else {
      message.channel.fetchMessages({ limit: 3 }).then(async messages => {
        let foundPhoto = false;
        await Promise.all(
          messages.map(m => {
            if (m.attachments.first()) {
              startCanvas(
                m.attachments.first().width,
                m.attachments.first().height,
                m.attachments.first().url
              );
              foundPhoto = true;
            }
          })
        );
        if (!foundPhoto) {
          return message.channel.send(
            "sorry but i cannot find any photos before the command ! just a heads up i only look in 2 messages above yours ! you can always give me the message id and use me like **.watercolour 679873905745199146** !!"
          );
        }
      });
    }
  }
  async function startCanvas(width, height, bufferURL) {
    const canvas = Canvas.createCanvas(width, height);

    const ctx = canvas.getContext("2d");

    const { body: buffer } = await snekfetch.get(bufferURL);
    const background = await Canvas.loadImage(buffer);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    await oilPaintEffect(canvas, ctx, 3, 65);

    let img = canvas.toBuffer();
    const attachment = new Discord.Attachment(img, "watercolour.png");
    message.channel.send(attachment);
  }

  function oilPaintEffect(canvas, ctx, radius, intensity) {
    var width = canvas.width,
      height = canvas.height,
      imgData = ctx.getImageData(0, 0, width, height),
      pixData = imgData.data,
      destCanvas = Canvas.createCanvas(canvas.width, canvas.height),
      dCtx = destCanvas.getContext("2d"),
      pixelIntensityCount = [];

    destCanvas.width = width;
    destCanvas.height = height;

    var destImageData = dCtx.createImageData(width, height),
      destPixData = destImageData.data,
      intensityLUT = [],
      rgbLUT = [];

    for (var y = 0; y < height; y++) {
      intensityLUT[y] = [];
      rgbLUT[y] = [];
      for (var x = 0; x < width; x++) {
        var idx = (y * width + x) * 4,
          r = pixData[idx],
          g = pixData[idx + 1],
          b = pixData[idx + 2],
          avg = (r + g + b) / 3;

        intensityLUT[y][x] = Math.round((avg * intensity) / 255);
        rgbLUT[y][x] = {
          r: r,
          g: g,
          b: b
        };
      }
    }

    for (y = 0; y < height; y++) {
      for (x = 0; x < width; x++) {
        pixelIntensityCount = [];

        // Find intensities of nearest pixels within radius.
        for (var yy = -radius; yy <= radius; yy++) {
          for (var xx = -radius; xx <= radius; xx++) {
            if (y + yy > 0 && y + yy < height && x + xx > 0 && x + xx < width) {
              var intensityVal = intensityLUT[y + yy][x + xx];

              if (!pixelIntensityCount[intensityVal]) {
                pixelIntensityCount[intensityVal] = {
                  val: 1,
                  r: rgbLUT[y + yy][x + xx].r,
                  g: rgbLUT[y + yy][x + xx].g,
                  b: rgbLUT[y + yy][x + xx].b
                };
              } else {
                pixelIntensityCount[intensityVal].val++;
                pixelIntensityCount[intensityVal].r += rgbLUT[y + yy][x + xx].r;
                pixelIntensityCount[intensityVal].g += rgbLUT[y + yy][x + xx].g;
                pixelIntensityCount[intensityVal].b += rgbLUT[y + yy][x + xx].b;
              }
            }
          }
        }

        pixelIntensityCount.sort(function(a, b) {
          return b.val - a.val;
        });

        var curMax = pixelIntensityCount[0].val,
          dIdx = (y * width + x) * 4;

        destPixData[dIdx] = ~~(pixelIntensityCount[0].r / curMax);
        destPixData[dIdx + 1] = ~~(pixelIntensityCount[0].g / curMax);
        destPixData[dIdx + 2] = ~~(pixelIntensityCount[0].b / curMax);
        destPixData[dIdx + 3] = 255;
      }
    }

    ctx.putImageData(destImageData, 0, 0);
  }
};
