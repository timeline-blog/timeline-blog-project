import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import HoverMenu from "./HoverMenu";
import NotificationsMenu from "./NotificationsMenu";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faBell from "@fortawesome/fontawesome-pro-light/faBell";
import NewStoryModal from "./NewStoryModal";

class Nav extends Component {
  constructor() {
    super();

    this.state = {
      hoverMenuMode: "hidden",
      notificationsMode: "hidden",
      modalMode: "hidden"
    };

    this.toggleHoverMenu = this.toggleHoverMenu.bind(this);
    this.toggleNotificationsMenu = this.toggleNotificationsMenu.bind(this);
    this.toggleNewStoryModal = this.toggleNewStoryModal.bind(this);
    this.hideAllMenus = this.hideAllMenus.bind(this);
  }

  toggleHoverMenu() {
    if (this.state.hoverMenuMode === "hidden") {
      this.setState({ hoverMenuMode: "visible", notificationsMode: "hidden" });
    } else {
      this.setState({ hoverMenuMode: "hidden" });
    }
  }

  toggleNotificationsMenu() {
    if (this.state.notificationsMode === "hidden") {
      this.setState({ notificationsMode: "visible", hoverMenuMode: "hidden" });
    } else {
      this.setState({ notificationsMode: "hidden" });
    }
  }

  hideAllMenus() {
    this.setState({
      hoverMenuMode: "hidden",
      notificationsMode: "hidden"
    });
  }

  toggleNewStoryModal() {
    if (this.state.modalMode === "hidden") {
      this.setState({ modalMode: "visible" });
    } else {
      this.setState({ modalMode: "hidden" });
    } 
  }

  render() {
    return (
      <Fragment>
      {/* *TO DO: conditional rendering depending on whether user is signed in or not */}
      <div className="main-nav">
        <div className="nav-left">
          <NavLink onClick={() => this.hideAllMenus()} to="/home">Home</NavLink>
          <NavLink onClick={() => this.hideAllMenus()} to="/discover">Discover</NavLink>
        </div>
        <div className="nav-right">
          {/* *TO DO: all content in nav-right will be conditionally rendered */}
          <button onClick={() => this.toggleNewStoryModal()} className="btn"> + New Story</button>
          {/* *TO DO: Notifications will be an icon; will need to remove NavLink since there is no notifications page */}
          <div className="notifications-wrap">
            <FontAwesomeIcon
              onClick={() => this.toggleNotificationsMenu()}
              icon={faBell}
            />
            <NotificationsMenu
              notificationsMode={this.state.notificationsMode}
              toggleNotificationsMenu={this.toggleNotificationsMenu}
            />
          </div>

          <div className="account-links-wrap">
            <img
              onClick={() => this.toggleHoverMenu()}
              className="navatar"
              src=""
              alt=""
            />
            <HoverMenu 
              hoverMenuMode={this.state.hoverMenuMode} 
              toggleHoverMenu={this.toggleHoverMenu}
            />
          </div>
        </div>
      </div>

      <NewStoryModal modalMode={this.state.modalMode} toggleModal={this.toggleNewStoryModal} />

      </Fragment>
    );
  }
}

export default Nav;
