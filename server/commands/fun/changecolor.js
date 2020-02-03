exports.run = async (client, message, args) => {
  let customRoles = [
    "646877619630899244",
    "627179571703447583",
    "635148096686522368",
    "651547606333390858",
    "626919130519568395",
    "661225122014691329",
    "648343939371499744",
    "651115640752439296",
    "638254922189635585",
    "664958752004505621",
    "651170085205180435",
    "656248592557932558",
    "663948238709325834",
    "653754818677964831",
    "663423171185213487",
    "663977787606040576",
    "667218872784519189"
  ];
  for (let role in message.author._roles) {
    if (customRoles.includes(message.author._roles[roles])) {
      let roleToChange = await message.guild.roles.get(
        message.author._roles[roles]
      );
      await roleToChange
        .setColor(args[1].replace(/([\s])/g))
        .then(() => message.channel.send("okay i did it !"))
        .catch(err => {
          console.error(err);
          message.channel.send(
            "sorry i was not able to ! make sure it is a hex code like #fdd1ff !!"
          );
          message.channel.send("<:deadinside:>");
        });
    }
  }
};
