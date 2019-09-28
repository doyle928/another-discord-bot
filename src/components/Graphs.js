import React, { Suspense } from "react";
import axios from "axios";
import {
  HorizontalGridLines,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
  LineSeries
} from "react-vis";

const randomColour = [
  "#01acc2",
  "#ffbf46",
  "#ff4350",
  "#e7556a",
  "#127a7f",
  "#56a1c9",
  "#eecb1c",
  "#d0477e",
  "#f8cd18"
];

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class Graphs extends React.Component {
  state = { servers: null, response: null, data: null };

  async componentDidMount() {
    let serverRes = await this.renderServers();
    let countRes = await this.renderData();
    this.setState({ servers: serverRes, response: countRes }, () => {
      let data = this.renderChartArray();
      this.setState({ data: data });
    });
  }

  renderServers = async () => {
    let res = await axios.post(
      "http://localhost:8080/api",
      {
        query: `query {
      getServers {
        guild_id
      }
    }`
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    console.log(res.data.data.getServers);

    return res.data.data.getServers;
  };

  renderData = async () => {
    let res = await axios.post(
      "http://localhost:8080/api",
      {
        query: `query {
      getCount {
        guild_id
        members
        timestamp
      }
    }`
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    console.log(res.data.data.getCount);

    return res.data.data.getCount;
  };

  renderChartArray() {
    if (this.state.servers && this.state.response) {
      console.log(this.state);
      let data = [];
      this.state.servers.map(server => {
        let points = [];
        this.state.response.map(count => {
          if (count.guild_id === server.guild_id) {
            points.push({
              x: count.timestamp,
              y: count.members
            });
          }
        });
        data.push({ server: server.guild_id, coordinates: points });
      });
      console.log(data);
      return data;
    }
  }

  renderGraphs() {
    console.log(this.state);
    if (this.state.data) {
      return (
        <div>
          {this.state.data.map(coord => {
            console.log(coord);
            return (
              <div className="graph">
                <h2>{coord.server}</h2>
                <XYPlot height={300} width={600}>
                  <HorizontalGridLines
                    style={{ stroke: "#e3dac9", opacity: 0.5 }}
                  />
                  <XAxis
                    title="Timestamp"
                    style={{ stroke: "#e3dac9", opacity: 0.9 }}
                  />
                  <YAxis
                    title="Members"
                    style={{ stroke: "#e3dac9", opacity: 0.9 }}
                  />
                  <LineSeries
                    data={coord.coordinates}
                    style={{
                      stroke: randomColour[randomIntFromInterval(0, 8)],
                      strokeWidth: 3
                    }}
                  />
                </XYPlot>
              </div>
            );
          })}
        </div>
      );
    }
  }

  render() {
    return <div>{this.renderGraphs()}</div>;
  }
}

export default Graphs;
