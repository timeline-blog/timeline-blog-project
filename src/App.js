import React, { Component } from "react";
import Nav from "./components/Nav";
import "./App.css";
import { HashRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <Nav />
        </div>
      </HashRouter>
    );
  }
}

export default App;
