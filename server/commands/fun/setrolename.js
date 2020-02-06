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
    "667218872784519189",
    "673747419988754462"
  ];
  let changedRoleCheck = false;
  for (let role in message.member._roles) {
    if (customRoles.includes(message.member._roles[role])) {
      let roleToChange = await message.guild.roles.get(
        message.member._roles[role]
      );
      let name = "";
      if (args[1]) {
        for (let i = 1; args.length; i++) {
          name += `${args[i]} `;
        }
        if (name.length > 32) {
          return message.channel.send(
            `the name was too long ! it can only be 32 characters ! not ${name.length} !`
          );
        } else {
          await roleToChange
            .setName(name)
            .then(() => {
              return message.channel.send("okay i did it !");
            })
            .catch(err => {
              console.error(err);
              message.channel.send(
                "sorry i was not able to ! make sure it is a hex code like #fdd1ff !!"
              );
              return message.channel.send("<:deadinside:606350795881054216>");
            });
          changedRoleCheck = true;
        }
      } else {
        return message.channel.send(
          "you need to tell me what you want it to be named dummy !"
        );
      }
    } else if (Number(role) === message.member._roles.length - 1) {
      if (!changedRoleCheck) {
        return message.channel.send(
          "sorry ! but you dont have a custom role to change !"
        );
      }
    }
  }
};
