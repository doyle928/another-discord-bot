const { request } = require("graphql-request");
const mongoose = require("mongoose");
// const _ = require("lodash");
// const fs = require("fs");
// const chartExporter = require("highcharts-export-server");

exports.run = async (client, message, args) => {
  if (message.author.id == "157673412561469440") {
    let guildId = message.guild.id.toString();
    state = `server_${guildId}`;

    mongoose
      .connect(`${process.env.MONGODB_URI}${state}`, { useNewUrlParser: true })
      .then(async () => {
        console.log("DB connected");
        let query = `{
      getUsers {
        user_id
        join_date
        strikes
      }
    }`;
        let url = "https://lulu-discord-bot.herokuapp.com/api";
        try {
          let res = await request(url, query);
          console.log(res);
        } catch (err) {
          console.error(err);
        }
      })
      .then(() => mongoose.disconnect())
      .catch(error => console.log(error));

    //     try {
    //       chartExporter.initPool();
    //       const chartDetails = {
    //         type: "png",
    //         options: {
    //           chart: {
    //             type: "areaspline"
    //           },
    //           title: {
    //             text: `Users in ${message.guild.name}`
    //           },
    //           legend: {
    //             layout: "vertical",
    //             align: "left",
    //             verticalAlign: "top",
    //             x: 150,
    //             y: 100,
    //             floating: true,
    //             borderWidth: 1,
    //             backgroundColor: "#353536"
    //           },
    //           yAxis: {
    //             title: {
    //               text: "Amount of Members"
    //             }
    //           },
    //           tooltip: {
    //             shared: true,
    //             valueSuffix: " units"
    //           },
    //           credits: {
    //             enabled: false
    //           },
    //           plotOptions: {
    //             areaspline: {
    //               fillOpacity: 0.5
    //             },
    //             series: {
    //               label: {
    //                 connectorAllowed: false
    //               },
    //               pointStart: 0
    //             }
    //           },
    //           series: [
    //             {
    //               name: "Users",
    //               data: //need to make an array that logs user count everytime someone joins and leaves the server
    //             }
    //           ]
    //         }
    //       };
    //       chartExporter.export(chartDetails, (err, res) => {
    //         // Get the image data (base64)
    //         let imageb64 = res.data;
    //         // Filename of the output
    //         let outputFile = "bar.png";
    //         // Save the image to file
    //         fs.writeFileSync(outputFile, imageb64, "base64", function(err) {
    //           if (err) console.log(err);
    //         });
    //         console.log("Saved image!");
    //         chartExporter.killPool();
    //       });
    //     } catch (err) {
    //       console.error(err);
    //     }
  }
};
