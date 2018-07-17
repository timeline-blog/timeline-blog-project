import React, { Component } from "react";
import UserSummary from "./UserSummary";
import { connect } from "react-redux";
import {
  getFollowers,
  getFollowing,
  addFollow
} from "../../ducks/reducers/followsReducer";
import { getLoggedInUser } from "../../ducks/reducers/userReducer";

class MyFollowers extends Component {
  constructor() {
    super();
    this.state = { followers: [], following: [], authedUser: [] };

    this.handleAddFollow = this.handleAddFollow.bind(this);
  }
  /**
   * Each user summary needs to know if logged in user follows the user being displayed:
   * 1. get logged in user_id
   * 2. get info for users following logged in user
   *    this.props.getFollowers( logged in user_id )
   * 3. since global "following" state is being mapped to props, we can use this.props.following to compare
   *    user_id of user being displayed with user_id of every user in this.props.following using filter;
   *    if the filtered array has a result, the UserSummary should take a prop indicating so (a boolean)
   * 4. UserSummary will need check the boolean to know whether to render "Follow" or "Unfollow"
   */
  componentDidMount() {
    this.props.getFollowers(this.props.user.user_id);
    this.props.getFollowing(this.props.user.user_id);
  }

  handleAddFollow(user_id, follower_id) {
    this.props.addFollow(user_id, follower_id).then(response => {
      console.log(response);
    });
  }

  render() {
    console.log(this.props.user.user_id);
    let followersList = this.props.followers.map((follows, index) => {
      return (
        <UserSummary
          key={index}
          userid={follows.user_id}
          display_name={follows.display_name}
          avatar={follows.avatar}
          following_id={follows.user_id}
          user_id={this.props.user.user_id}
          following={this.props.following}
          handleAddFollow={this.handleAddFollow}
        />
      );
    });
    return (
      <div className="outer-wrap followers-wrap">
        <div className="inner-wrap">
          <div className="page-header followers-header">
            <h1 className="page-title">My Followers</h1>

            <input
              type="text"
              className="main-input"
              placeholder="Search users..."
            />
          </div>

          <div className="followers-list-wrap">
            <h3 className="followers-list-title">
              {this.props.followers.length} followers
            </h3>
          </div>
          {followersList}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    followers: state.follows.followers,
    following: state.follows.following,
    user: state.user.authedUser
  };
};
export default connect(
  mapStateToProps,
  { getFollowers, getFollowing, getLoggedInUser, addFollow }
)(MyFollowers);
