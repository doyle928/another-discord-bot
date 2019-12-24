const request = require("request");
const cheerio = require("cheerio");
const queryString = require("querystring");
const Discord = require("discord.js");
const randomColor = require("../../data/randomColor");
const randomNumber = require("../../data/randomNumber");

exports.run = async (client, message, args) => {
  if (!args[1]) {
    message.channel.send("there's no search term specified!!!");
    message.channel.send("<a:02upset:538273249306345476>");
  } else {
    let baseURL = "http://images.google.com/search?";

    function gis(opts, done) {
      let searchTerm;
      let queryStringAddition;
      let filterOutDomains;

      if (typeof opts === "string") {
        searchTerm = opts;
      } else {
        searchTerm = opts.searchTerm;
        queryStringAddition = opts.queryStringAddition;
        filterOutDomains = opts.filterOutDomains;
      }

      let url =
        baseURL +
        queryString.stringify({
          tbm: "isch",
          q: searchTerm
        });

      if (filterOutDomains) {
        url += encodeURIComponent(
          " " + filterOutDomains.map(addSiteExcludePrefix).join(" ")
        );
      }

      if (queryStringAddition) {
        url += queryStringAddition;
      }
      let reqOpts = {
        url: url,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
        }
      };

      // console.log(reqOpts.url);
      request(reqOpts, parseGISResponse);
      let gisURLs;
      function parseGISResponse(error, response, body) {
        if (error) {
          done(error);
        } else {
          let $ = cheerio.load(body);
          let metaLinks = $(".rg_meta");
          gisURLs = [];
          metaLinks.each(collectHref);
          done(error, gisURLs);
        }

        function collectHref(i, element) {
          if (element.children.length > 0 && "data" in element.children[0]) {
            let metadata = JSON.parse(element.children[0].data);
            if (metadata.ou) {
              // console.log(metadata)
              let result = {
                url: metadata.ou,
                width: metadata.ow,
                height: metadata.oh,
                thumbnail: metadata.tu,
                type: metadata.ity,
                hosting: metadata.isu
              };
              if (domainIsOK(result.url)) {
                gisURLs.push(result);
              }
            }
            // Elements without metadata.ou are subcategory headings in the results page.
          }
        }
      }

      function domainIsOK(url) {
        if (!filterOutDomains) {
          return true;
        } else {
          return filterOutDomains.every(skipDomainIsNotInURL);
        }

        function skipDomainIsNotInURL(skipDomain) {
          return url.indexOf(skipDomain) === -1;
        }
      }
    }

    function addSiteExcludePrefix(s) {
      return "-site:" + s;
    }

    let query = "";
    for (let k = 1; k < args.length; k++) {
      query += args[k] + " ";
    }

    gis(query, logResults);

    async function logResults(error, results) {
      if (error) {
        console.log(error);
        message.channel.send("i was not able to ");
        message.channel.send("<:deadinside:606350795881054216>");
      } else {
        if (results.length === 0) {
          message.channel.send("no results or i broke something");
          message.channel.send("<:deadinside:606350795881054216>");
          return;
        }
        let randomImg = await getNewImage(results, 1);

        if (randomImg === false) {
          message.channel.send("i was not able to ");
          message.channel.send("<:deadinside:606350795881054216>");
          return;
        }

        let messageEmbed = new Discord.RichEmbed()
          .setColor(randomColor())
          .setTitle(`Résultat pour la recherche: ${query}`)
          .setAuthor(message.author.tag, message.author.displayAvatarURL)
          .setImage(randomImg.url)
          .setFooter(
            `Résolution: ${randomImg.width} x ${
              randomImg.height
            } | Format: ${randomImg.type.toUpperCase()}`
          )
          .setTimestamp();

        message.channel.send(messageEmbed);
      }
    }

    function getNewImage(results, i) {
      if (i > 3) {
        message.channel.send("i was not able to ");
        message.channel.send("<:deadinside:606350795881054216>");
        return false;
      }
      if (results.length < 7) {
        randomImg = results[randomNumber(0, results.length - 1)];
      } else {
        randomImg = results[randomNumber(0, 7)];
      }
      if (randomImg.type.length < 3) {
        return getNewImage(results, i++);
      } else {
        return randomImg;
      }
    }
  }
};