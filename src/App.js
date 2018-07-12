import React, { Component } from "react";
import { Provider } from 'react-redux';
import { HashRouter } from "react-router-dom";
import "./App.css";
import store from './ducks/store';
import Nav from "./components/Nav";
import routes from "./routes";
import Footer from "./components/Footer";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <div className="App">
            <Nav />
            {routes}
            <Footer />
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
