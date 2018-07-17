import React, { Component } from "react";
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

class HoverMenu extends Component {
  render() {
    return (
      <div
        className={`hover-main-wrap account-hover ${this.props.hoverMenuMode}`}
      >
        {/* <Link to={`/profile/${this.props.authedUser.user_id}`}> */}
        <Link to="/profile/1">
          <button onClick={() => this.props.toggleHoverMenu()}>My Profile</button>
        </Link>
        <Link to="/following">
          <button onClick={() => this.props.toggleHoverMenu()}>Following</button>
        </Link>
        <Link to="/followers">
          <button onClick={() => this.props.toggleHoverMenu()}>Followers</button>
        </Link>
        <div>
          <span className="logged-in-as">Logged in as: <strong>display_name</strong></span>
          <Link to="/">
            <button>Logout</button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authedUser: state.user.authedUser
  };
};

export default connect(mapStateToProps)(HoverMenu);
