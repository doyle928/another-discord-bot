const randomNumber = require("../../data/randomNumber");
const randomColor = require("../../data/randomColor");
const Discord = require("discord.js");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

exports.run = async (client, message, args) => {
  let member = null;
  if (!message.mentions.members.first()) {
    message.channel.send("You did not mention the user! ");
    message.channel.send("<a:02upset:538273249306345476>");
    return;
  } else {
    member = await message.mentions.members.first();

    args.shift();
    let query = "";
    for (let i = 0; i < args.length; i++) {
      if (args[i].indexOf(`${member.user.id}`) === -1) {
        query += `${args[i]} `;
      }
    }

    function httpGetAsync(theUrl, callback) {
      // create the request object
      let xmlHttp = new XMLHttpRequest();

      // set the state change callback to capture when the response comes in
      xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
          callback(xmlHttp.responseText);
        }
      };

      // open as a GET call, pass in the url and set async = True
      xmlHttp.open("GET", theUrl, true);

      // call send with no params as they were passed in on the url string
      xmlHttp.send(null);

      return;
    }

    // callback for the top 8 GIFs of search
    function tenorCallback_search(responsetext) {
      // parse the json response
      let response_objects = JSON.parse(responsetext);

      top_15_gifs = response_objects["results"];
      if (top_15_gifs.length >= 14) {
        sendMessage(top_15_gifs[randomNumber(0, 14)].media[0].gif.url);
      } else {
        sendMessage(
          top_15_gifs[randomNumber(0, top_15_gifs.length - 1)].media[0].gif.url
        );
      }

      return;
    }

    // function to call the trending and category endpoints
    function grab_data() {
      // set the apikey and limit
      let apikey = process.env.TENOR_KEY;
      let lmt = 15;

      // test search term
      let search_term = query;

      // using default locale of en_US
      let search_url =
        "https://api.tenor.com/v1/search?tag=" +
        search_term +
        "&key=" +
        apikey +
        "&limit=" +
        lmt;

      httpGetAsync(search_url, tenorCallback_search);

      // data will be loaded by each call's callback
      return;
    }

    function sendMessage(url) {
      let showQuery = "";
      for (let i = 0; i < args.length; i++) {
        if (args[i].indexOf(`${member.user.id}`) === -1) {
          if (
            args[i].toLowerCase() !== "anime" &&
            args[i].toLowerCase() !== "movie"
          )
            showQuery += `${args[i]} `;
        }
      }
      let messageEmbed = new Discord.RichEmbed()
        .setColor(randomColor())
        .setTitle(
          `${message.author.username} to ${member.user.username}: ${showQuery}`
        )
        .setImage(url)
        .setTimestamp()
        .setFooter(showQuery);
      message.channel.send(messageEmbed);
    }

    grab_data();
  }
};
