import React, { Component } from "react";
import UserSummary from "./UserSummary";
import { connect } from "react-redux";
import { getFollowing } from "../../ducks/reducers/followsReducer";
import { getLoggedInUser } from "../../ducks/reducers/userReducer";

class Following extends Component {
  constructor() {
    super();
    this.state = { following: [], authedUser: [] };
  }

  componentDidMount() {
    this.props.getFollowing(this.props.user.user_id);
  }
  render() {
    console.log(this.props.user.user_id);
    let followingList = this.props.following.map((follows, index) => {
      return (
        <UserSummary
          key={index}
          display_name={follows.display_name}
          avatar={follows.avatar}
          following_id={follows.user_id}
          following={this.props.following}
        />
      );
    });
    return (
      <div className="outer-wrap followers-wrap">
        <div className="inner-wrap">
          <div className="page-header followers-header">
            <h1 className="page-title">Following</h1>

            <input
              type="text"
              className="main-input"
              placeholder="Search users..."
            />
          </div>

          <div className="followers-list-wrap">
            <h3 className="followers-list-title">
              {this.props.following.length} following
            </h3>
            {followingList}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    following: state.follows.following,
    user: state.user.authedUser
  };
};
export default connect(
  mapStateToProps,
  { getFollowing, getLoggedInUser }
)(Following);
