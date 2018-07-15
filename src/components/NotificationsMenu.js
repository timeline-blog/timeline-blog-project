import React, { Component } from "react";

class HoverMenu extends Component {
  render() {
    return (
      <div className={`hover-main-wrap notifications-hover ${this.props.notificationsMode}`}>
        {/* <a href="/"> */}
          <button onClick={() => this.props.toggleNotificationsMenu()}>John Doe liked your story</button>
        {/* </a> */}
        {/* <a href="/"> */}
          <button onClick={() => this.props.toggleNotificationsMenu()}>John Doe started following</button>
        {/* </a> */}
        {/* <a href="/"> */}
          <button onClick={() => this.props.toggleNotificationsMenu()}>Jane Doe started following you</button>
        {/* </a> */}
      </div>
    );
  }
}
export default HoverMenu;