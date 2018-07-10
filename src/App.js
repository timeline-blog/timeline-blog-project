import React, { Component } from "react";
import Nav from "./components/Nav";
// import Landing from "./components/Landing";
import { HashRouter } from "react-router-dom";
import routes from "./routes"

import "./App.css";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <Nav />
          {routes}
          {/* <Landing /> */}
        </div>
      </HashRouter>
    );
  }
}

export default App;
