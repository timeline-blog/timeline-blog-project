import React, { Component } from "react";
import {
  addFollow,
  unfollow,
  getFollowers
} from "../../ducks/reducers/followsReducer";
import { connect } from "react-redux";

class UserSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      followButton: ""
    };
  }
  componentDidMount() {
    let isFollowing = this.props.following.filter(
      user => this.props.userid === user.userid
    );
    if (isFollowing[0]) {
      this.setState({ followButton: "unfollow" });
    } else {
      this.setState({ followButton: "follow" });
    }
  }
  render() {
    console.log(this.props);

    return (
      <div className="user-summary-wrap">
        <div className="user-info">
          <img src={this.props.avatar} />
          <span>{this.props.display_name}</span>
        </div>

        {/* 
      *TO DO: this button will be conditionally rendered, in order to be reusable in both Followers and Following
      * It should check if the user of this summary is among the logged in user's followers; if true, show Unfollow, else Follow
      * for unfollow: className="btn border-btn negative-border-btn"
      * for follow: className="btn"
    */}
        {this.state.followButton === "unfollow" ? (
          <button
            onClick={() =>
              this.props
                .unfollow(
                  this.props.authedUser.user_id,
                  this.props.following_id
                )
                .then(() => this.setState({ followButton: "follow" }))
            }
            className="btn border-btn negative-border-btn"
          >
            Unfollow
          </button>
        ) : (
          <button
            onClick={() =>
              this.props
                .addFollow(
                  this.props.authedUser.user_id,
                  this.props.following_id
                )
                .then(() => this.setState({ followButton: "unfollow" }))
            }
            className="btn "
          >
            Follow
          </button>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    authedUser: state.user.authedUser,
    followersList: state.follows.followers
  };
};
export default connect(
  mapStateToProps,
  { addFollow, unfollow, getFollowers }
)(UserSummary);
