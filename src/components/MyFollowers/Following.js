import React, { Component } from "react";
import UserSummary from "./UserSummary";
import { connect } from "react-redux";
import { getFollowing } from "../../ducks/reducers/followsReducer";

class Following extends Component {
  constructor() {
    super();
    this.state = { following: [] };
  }
  actionHandler = (follower_id, following_id) => {
    this.props.unfollow(follower_id, following_id);
  };

  componentDidMount() {
    this.props.getFollowing(1);
  }
  render() {
    let followingList = this.props.following.map((follows, index) => {
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
            <h1 className="page-title">Following</h1>

            <input
              type="text"
              className="main-input"
              placeholder="Search users..."
            />
          </div>

          <div className="followers-list-wrap">
            <h3 className="followers-list-title">225 following</h3>
            {followingList}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { following: state.follows.following };
};
export default connect(
  mapStateToProps,
  { getFollowing }
)(Following);
