import React, { Component } from "react";

class HoverMenu extends Component {
  render() {
    return (
      <div className={`hover-main-wrap account-hover ${this.props.hoverMenuMode}`}>
        <a href="/profile/:user_id">
          <button>My Profile</button>
        </a>
        <a href="/following">
          <button>Following</button>
        </a>
        <a href="/followers">
          <button>Followers</button>
        </a>
        <div>
          <a href="/">
            <button>Logout</button>
          </a>
        </div>
      </div>
    );
  }
}
export default HoverMenu;