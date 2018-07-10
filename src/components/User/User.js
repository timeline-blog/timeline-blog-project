import React, { Component } from "react";
import { Link } from "react-router-dom";

import StoryPreview from '../StoryPreview';

class User extends Component {
  render() {
    return (
      <div className="outer-wrap profile-wrap">
        <div className="inner-wrap">
            
          <div className="page-header profile-header">
            <img className="profile-avatar" />
            <h1 className="page-title profile-title">User's name</h1>
            <p className="page-description profile-description">Brief Description of user</p>
            <div className="follow-info-wrap">
              <button className="follow-btn btn">Follow</button>
              <span className="follow-count">225</span>
            </div>
          </div>  
          
          <div className="story-grid">
            <StoryPreview />
            <StoryPreview />
            <StoryPreview />
            <StoryPreview />
          </div>
        </div>  
      </div>
    );
  }
}
export default User;
