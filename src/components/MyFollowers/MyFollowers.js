import React, { Component } from "react";
import UserSummary from "./UserSummary";
import { connect } from "react-redux";
import { getFollowers, unfollow } from "../../ducks/reducers/followsReducer";

class MyFollowers extends Component {
  constructor() {
    super();
    this.state = { followers: [] };
  }
  actionHandler = (follower_id, following_id) => {
    this.props.unfollow(follower_id, following_id);
  };

  componentDidMount() {
    this.props.getFollowers(1);
  }
  render() {
    console.log(this.props.followers);
    let followersList = this.props.followers.map((follows, index) => {
      console.log(follows);
      return (
        <UserSummary
          key={index}
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
  return { followers: state.follows.followers };
};
export default connect(
  mapStateToProps,
  { getFollowers, unfollow }
)(MyFollowers);
