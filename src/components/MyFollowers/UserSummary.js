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
  }
  render() {
    console.log(this.props);
    let isFollowing = this.props.following.filter(
      user => this.props.userid === user.userid
    );

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
        {isFollowing[0] ? (
          <button
            onClick={() =>
              this.props.unfollow(
                this.props.user.authedUser.user_id,
                this.props.following_id
              )
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
                  this.props.user.authedUser.user_id,
                  this.props.following_id
                )
                .then(() => this.props.getFollowers())
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
  return { ...state };
};
export default connect(
  mapStateToProps,
  { addFollow, unfollow, getFollowers }
)(UserSummary);
