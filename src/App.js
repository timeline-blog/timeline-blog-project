import React, { Component } from "react";
import Nav from "./components/Nav";
// import MyFollowers from "./components/MyFollowers/MyFollowers";
import User from "./components/User/User";
import "./App.css";
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

          <User />

          {routes}
          {/* <Landing /> */}
        </div>
      </HashRouter>
    );
  }
}

export default App;
