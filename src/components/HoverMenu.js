import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { clearUser } from '../ducks/reducers/userReducer';

class HoverMenu extends Component {

  render() {
    // console.log('HOVER props!!!   ', this.props);
    const {user} = this.props;

    return (
      <div
        className={`hover-main-wrap account-hover ${this.props.hoverMenuMode}`}
      >
        <span className="logged-in-as">Logged in as: <strong>{user.display_name}</strong></span>
        <Link to={`/profile/${user.user_id}`}>
          <button onClick={() => this.props.toggleHoverMenu()}>My Profile</button>
        </Link>
        <Link to="/following">
          <button onClick={() => this.props.toggleHoverMenu()}>Following</button>
        </Link>
        <Link to="/followers">
          <button onClick={() => this.props.toggleHoverMenu()}>Followers</button>
        </Link>
        <div>
          <a href='http://localhost:3001/auth/logout'>
            <button onClick={() => this.props.toggleHoverMenu()}>Log Out</button>
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.authedUser
  }
};
export default withRouter(connect(mapStateToProps, {clearUser})(HoverMenu));
