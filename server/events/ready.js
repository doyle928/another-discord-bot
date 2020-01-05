module.exports = async client => {
  console.log("started");

  client.user.setStatus("idle");

  client.user.setActivity("mon fils stp pas touche", {
    type: 3
  });

  let s = client.guilds.get("559560674246787087");
  await s.channels.get("559709338638352405").fetchMessage("662982653074472960");

  //roles reaction messages below
  await s.channels
    .get("561423217709940770")
    .fetchMessage("663149701687672862")
    .then(msg => {
      //age
      msg.react("regional_indicator_a");
      msg.react("regional_indicator_b");
      msg.react("regional_indicator_c");
      msg.react("regional_indicator_d");
      msg.react("regional_indicator_e");
    });
  await s.channels
    .get("561423217709940770")
    .fetchMessage("663150060904644608")
    .then(msg => {
      //personality
      msg.react("regional_indicator_i");
      msg.react("regional_indicator_e");
      msg.react("regional_indicator_a");
    });
  await s.channels
    .get("561423217709940770")
    .fetchMessage("663150398458167306")
    .then(msg => {
      //gaming
      msg.react("regional_indicator_p");
      msg.react("regional_indicator_x");
      msg.react("regional_indicator_s");
      msg.react("desktop_computer");
      msg.react("iphone");
    });
  await s.channels
    .get("561423217709940770")
    .fetchMessage("663150874184646713")
    .then(msg => {
      //relationship
      msg.react("woman_tipping_hand");
      msg.react("heart");
      msg.react("speak_no_evil");
    });
  await s.channels
    .get("561423217709940770")
    .fetchMessage("663151089054646315")
    .then(msg => {
      //dm
      msg.react("white_check_mark");
      msg.react("x");
      msg.react("question");
    });
  await s.channels
    .get("561423217709940770")
    .fetchMessage("663151396727554059")
    .then(msg => {
      //interests
      msg.react("shallow_pan_of_food");
      msg.react("🐶");
      msg.react("sunrise_over_mountains");
      msg.react("soccer");
      msg.react("musical_note");
      msg.react("blue_car");
      msg.react("books");
      msg.react("tv");
      msg.react("computer");
      msg.react("hibiscus");
      msg.react("paintbrush");
      msg.react("video_game");
      msg.react("womans_clothes");
    });
  await s.channels
    .get("561423217709940770")
    .fetchMessage("663153065565618190")
    .then(msg => {
      //voicechat
      msg.react("microphone2");
    });
};
