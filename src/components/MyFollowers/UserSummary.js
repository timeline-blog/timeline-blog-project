import React from "react";

export default function UserSummary(props) {
  return (
    <div className="user-summary-wrap">
      <div className="user-info">
        <img src={props.avatar} />
        <span>{props.display_name}</span>
      </div>

      {/* 
      *TO DO: this button will be conditionally rendered, in order to be reusable in both Followers and Following
      * It should check if the user of this summary is among the logged in user's followers; if true, show Unfollow, else Follow
      */}
      <button
        onClick={(user_id, following_id) =>
          props.actionHandler(1, props.following_id)
        }
        className="btn border-btn negative-border-btn"
      >
        Unfollow
      </button>
    </div>
  );
}
