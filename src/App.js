import React, { Suspense } from "react";
import "./App.css";
import "../node_modules/react-vis/dist/style.css";
import Graphs from "./components/Graphs";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Suspense fallback={<div>Loading</div>}>
          <Graphs />
        </Suspense>
      </div>
    );
  }
}

export default App;
