import React, { Component } from "react";
import StoryPreview from "./StoryPreview";

class Discover extends Component {
  render() {
    return (
      <div className="outer-wrap home-wrap">
        <div className="inner-wrap">
          <div className="page-header discover-header">
            <h1 className="page-title">Discover</h1>
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
export default Discover;
