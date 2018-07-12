import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import HoverMenu from "./HoverMenu";

class Nav extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      // *TO DO: conditional rendering depending on whether user is signed in or not
      <div className="main-nav">
        <div className="nav-left">
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/discover">Discover</NavLink>
        </div>
        <div className="nav-right">
          <button className="btn"> + New Story</button>
          {/* *TO DO: Notifications will be an icon; will need to remove NavLink since there is no notifications page */}
          <NavLink to="/#/">Notifications</NavLink>
          <img onMouseOver className="navatar" src="" alt="" />
          <HoverMenu/>
        </div>
      </div>
    );
  }
}

export default Nav;
