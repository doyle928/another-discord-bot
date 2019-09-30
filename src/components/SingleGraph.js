import React from "react";
import { connect } from "react-redux";
import { fetchServer } from "../actions";
import {
  HorizontalGridLines,
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

function timeConverter(UNIX_timestamp) {
  let a = new Date(UNIX_timestamp);
  let months = [
    "janv",
    "févr",
    "mars",
    "avr",
    "mai",
    "juin",
    "juil",
    "août",
    "sept",
    "oct",
    "nov",
    "déc"
  ];
  let year = a.getFullYear();
  let month = months[a.getMonth()];
  let date = a.getDate();
  let hour = a.getHours();
  let min = a.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  let time = `${date} ${month}, ${year} - ${hour}h${min}`;
  return time;
}

class SingleGraph extends React.PureComponent {
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.props.counts !== prevState.counts) {
  //     return { counts: nextProps.counts };
  //   } else {
  //     return null;
  //   }
  // }
  // async componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.counts !== this.state.counts) {
  //     await this.props.fetchServer(this.props.match.params.id);
  //   }
  // }
  async componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      await this.props.fetchServer(this.props.match.params.id);
    }
  }

  renderChartArray() {
    if (this.props.counts) {
      let data = [];
      this.props.counts.map(count => {
        data.push({
          //x: count.timestamp,
          x: timeConverter(parseInt(count.timestamp)),
          y: count.members
        });
      });
      return data;
    }
  }

  renderGraph() {
    if (this.props.counts) {
      return (
        <div className="graph">
          <h2>{this.props.match.params.id}</h2>
          <XYPlot
            height={400}
            width={600}
            xType="ordinal"
            margin={{ bottom: 100 }}
          >
            <HorizontalGridLines style={{ stroke: "#e3dac9", opacity: 0.5 }} />
            <XAxis
              title="Timestamp"
              style={{ stroke: "#e3dac9", opacity: 0.9 }}
              tickLabelAngle={-45}
            />
            <YAxis
              title="Members"
              style={{ stroke: "#e3dac9", opacity: 0.9 }}
            />
            <LineSeries
              data={this.renderChartArray()}
              style={{
                stroke: randomColour[randomIntFromInterval(0, 8)],
                strokeWidth: 3
              }}
            />
          </XYPlot>
        </div>
      );
    }
  }

  render() {
    return <div>{this.renderGraph()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    counts: state.counts.counts
  };
};

export default connect(
  mapStateToProps,
  { fetchServer }
)(SingleGraph);
