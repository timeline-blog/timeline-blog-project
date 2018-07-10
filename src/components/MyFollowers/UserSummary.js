import React from "react";

export default function UserSummary() {
  return (
    <div className="user-summary-wrap">
      <div className="user-info">
        <img />
        <span>John Doe</span>
      </div>

      {/* 
      *TO DO: this button will be conditionally rendered, in order to be reusable in both Followers and Following
      * It should check if the user of this summary is among the logged in user's followers; if true, show Unfollow, else Follow
      */}
      <button className="btn border-btn negative-border-btn">Unfollow</button> 
    </div>
  );
}
