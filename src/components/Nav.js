import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Nav extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="main-nav">
        <div className="nav-left">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/">Discover</NavLink>
        </div>
        <div className="nav-right">
          <button className="btn"> + New Story</button>
          <NavLink to="/">Notifications</NavLink>
          <img className="navatar" src="" alt="" />
        </div>
      </div>
    );
  }
}

export default Nav;
