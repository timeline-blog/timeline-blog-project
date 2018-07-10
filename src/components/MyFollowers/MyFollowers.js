import React, { Component } from "react";
import UserSummary from "./UserSummary";

class MyFollowers extends Component {
  render() {
    return (
      <div className="outer-wrap followers-wrap">
        <div className="inner-wrap">
        
          <div className="page-header followers-header">
            <h1 className="page-title">My Followers</h1>

            <input type="text" className="main-input" placeholder="Search users..."/>
          </div>
          
          <div className="followers-list-wrap">
            <h3 className="followers-list-title">225 followers</h3>
            <UserSummary />
            <UserSummary />
            <UserSummary />
            <UserSummary />
            <UserSummary />
            <UserSummary />
          </div>

        </div>
      </div>
    );
  }
}

export default MyFollowers;
