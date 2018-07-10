import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import StoryPreview from "../StoryPreview";

class LikedStories extends Component {
  render() {
    return (
      <div className="outer-wrap liked-stories-wrap">
        <div className="inner-wrap">
          {/* <h1 className="page-title">Home</h1> */}
          <header className="home-header">
            <NavLink to="/home" className="home-tab">
              Following
            </NavLink>
            <NavLink to="/liked-stories" className="home-tab">
              Liked Stories
            </NavLink>
          </header>

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

export default LikedStories;
