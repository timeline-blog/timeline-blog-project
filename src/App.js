import React, { Component } from "react";
import Nav from "./components/Nav";
// import MyFollowers from "./components/MyFollowers/MyFollowers";
import User from "./components/User/User";
import "./App.css";
import { HashRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <Nav />
          <User />
        </div>
      </HashRouter>
    );
  }
}

export default App;
