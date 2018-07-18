import React, { Component } from "react";
import {
  addFollow,
  unfollow,
  getFollowers
} from "../../ducks/reducers/followsReducer";
import { connect } from "react-redux";

function UserSummary(props) {
  let filtered = props.followingList.filter(user => user.user_id === props.user_id)
  return (
    <div className="user-summary-wrap">
      <div className="user-info">
        <img src={props.avatar} />
        <span>{props.display_name}</span>
      </div>

        {/* 
      *TO DO: this button will be conditionally rendered, in order to be reusable in both Followers and Following
      * It should check if the user of this summary is among the logged in user's followers; if true, show Unfollow, else Follow
      * for unfollow: className="btn border-btn negative-border-btn"
      * for follow: className="btn"
      */}
      {filtered[0] ? (
        <button
          onClick={() =>
            props.unfollow(1, props.user_id)
          }
          className="btn border-btn negative-border-btn"
        >
          Unfollow
        </button>
      ) : (
        <button
          onClick={() =>
            props.addFollow(1, props.user_id)
          }
          className="btn"
        >
          Follow
        </button>
      )}
    </div>
  );
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
