import React, { Component } from "react";
import Nav from "./components/Nav";
import "./App.css";
import { HashRouter } from "react-router-dom";
import routes from "./routes";
import Footer from "./components/Footer";

import "./App.css";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <Nav />
          {routes}
          <Footer />
        </div>
      </HashRouter>
    );
  }
}

export default App;
