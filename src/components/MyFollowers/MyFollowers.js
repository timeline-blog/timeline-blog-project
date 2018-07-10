import React, { Component } from "react";
import UserSummary from "./UserSummary";

class MyFollowers extends Component {
  render() {
    return (
      <div className="outer-wrap followers-wrap">
        followers
        <UserSummary />
      </div>
    );
  }
}

export default MyFollowers;
