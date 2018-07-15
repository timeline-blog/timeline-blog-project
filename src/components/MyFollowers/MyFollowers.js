import React, { Component } from "react";
import UserSummary from "./UserSummary";
import { connect } from "react-redux";
import {
  getFollowers,
  getFollowing,
  unfollow
} from "../../ducks/reducers/followsReducer";

class MyFollowers extends Component {
  constructor() {
    super();
    this.state = { followers: [], following: [] };
  }
  actionHandler = (follower_id, following_id) => {
    this.props.unfollow(follower_id, following_id);
  };

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
    this.props.getFollowers(1);
    this.props.getFollowing(1);
  }
  render() {
    console.log(
      this.props.followers,
      " followers",
      this.props.following,
      "following"
    );
    let followersList = this.props.followers.map((follows, index) => {
      return (
        <UserSummary
          key={index}
          userid={follows.user_id}
          display_name={follows.display_name}
          avatar={follows.avatar}
          actionHandler={this.unfollow}
          following_id={follows.user_id}
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
            <h3 className="followers-list-title">225 followers</h3>
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
    following: state.follows.following
  };
};
export default connect(
  mapStateToProps,
  { getFollowers, getFollowing, unfollow }
)(MyFollowers);
