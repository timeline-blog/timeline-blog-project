import React, { Component } from "react";

class HoverMenu extends Component {
  render() {
    return (
      <div className={`hover-main-wrap notifications-hover ${this.props.notificationsMode}`}>
        <a href="/profile/:user_id">
          <button>John Doe liked your story</button>
        </a>
        <a href="/following">
          <button>John Doe started following</button>
        </a>
        <a href="/followers">
          <button>Jane Doe started following you</button>
        </a>
      </div>
    );
  }
}
export default HoverMenu;