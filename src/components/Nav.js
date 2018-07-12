import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import HoverMenu from "./HoverMenu";
import NotificationsMenu from "./NotificationsMenu";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faBell from "@fortawesome/fontawesome-pro-light/faBell";

class Nav extends Component {
  constructor() {
    super();

    this.state = {
      hoverMenuMode: "hidden",
      notificationsMode: "hidden"
    };

    this.toggleHoverMenu = this.toggleHoverMenu.bind(this);
    this.toggleNotificationsMenu = this.toggleNotificationsMenu.bind(this);
  }

  toggleHoverMenu() {
    if (this.state.hoverMenuMode === "hidden") {
      this.setState({ hoverMenuMode: "visible" });
    } else {
      this.setState({ hoverMenuMode: "hidden" });
    }
  }

  toggleNotificationsMenu() {
    if (this.state.notificationsMode === "hidden") {
      this.setState({ notificationsMode: "visible" });
    } else {
      this.setState({ notificationsMode: "hidden" });
    }
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
          <div className="notifications-wrap">
            <FontAwesomeIcon
              onClick={() => this.toggleNotificationsMenu()}
              icon={faBell}
            />
            <NotificationsMenu
              notificationsMode={this.state.notificationsMode}
            />
          </div>

          <div className="account-links-wrap">
            <img
              onClick={() => this.toggleHoverMenu()}
              className="navatar"
              src=""
              alt=""
            />
            <HoverMenu hoverMenuMode={this.state.hoverMenuMode} />
          </div>
        </div>
      </div>
    );
  }
}

export default Nav;
