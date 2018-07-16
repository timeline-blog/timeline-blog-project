import React, { Component } from "react";

class HoverMenu extends Component {
  render() {
    return (
      <div
        className={`hover-main-wrap account-hover ${this.props.hoverMenuMode}`}
      >
        <a href="/profile/:user_id">
          <button onClick={() => this.props.toggleHoverMenu()}>My Profile</button>
        </a>
        <a href="/#/following">
          <button onClick={() => this.props.toggleHoverMenu()}>Following</button>
        </a>
        <a href="/#/followers">
          <button onClick={() => this.props.toggleHoverMenu()}>Followers</button>
        </a>
        <div>
          <span className="logged-in-as">Logged in as: <strong>display_name</strong></span>
          <a href="/">
            <button>Logout</button>
          </a>
        </div>
      </div>
    );
  }
}
export default HoverMenu;
