import React, { Component } from "react";
import { connect } from 'react-redux';
import _ from 'lodash';

import { getStoriesDiscoverAll } from '../ducks/reducers/previewsReducer';

import StoryPreview from "./StoryPreview";

class Discover extends Component {
  constructor() {
    super();

    this.state = {
      selectedCategory: 'All'
    };
  }

  componentDidMount() {
    this.props.getStoriesDiscoverAll();
  }

  switchCategory( category ) {
    // console.log( category );
    this.setState({ selectedCategory: category });
  }

  render() {

    const stories = _.map(this.props.stories);
    const sorted = _.sortBy(stories, [function(story) {return story[0].like_count}]).reverse();
    // console.log('SORTED!!!   ',sorted);
    const mappedStories = sorted.map(story => {
      console.log(story);
      return(
        <StoryPreview 
          key = {story[0].story_id}
          display_name = {story[0].display_name}
          avatar = {story[0].avatar}
          user_id = {story[0].user_id}

          story_title = {story[0].story_title}
          story_category = {story[0].story_category}
          like_count = {story[0].like_count}
          story_id = {story[0].story_id}
          
          event_title = {story[1] ? story[1].event_title : 'No events'}
          e_created_on = {story[1] ? story[1].e_created_on : null}
          event_id = {story[1] ? story[1].event_id : null}

          url = {story[2] ? story[2].url : 'No image'}
        />
      )
    })

    return (
      <div className="outer-wrap home-wrap">
        <div className="inner-wrap">
          <div className="page-header discover-header">
            <h1 className="page-title">Discover</h1>
            <div className="categories-wrap">
              <span 
                onClick={(e) => this.switchCategory(e.target.innerText)} 
                className={this.state.selectedCategory === "All" ? "category-label selected" : "category-label"}
              >
                All
              </span>
              <span 
                onClick={(e) => this.switchCategory(e.target.innerText)} 
                className={this.state.selectedCategory === "Travel" ? "category-label selected" : "category-label"}
              >
                Travel
              </span>
              <span 
                onClick={(e) => this.switchCategory(e.target.innerText)} 
                className={this.state.selectedCategory === "Music" ? "category-label selected" : "category-label"}
              >
                Music
              </span>
              <span 
                onClick={(e) => this.switchCategory(e.target.innerText)} 
                className={this.state.selectedCategory === "Food" ? "category-label selected" : "category-label"}
              >
                Food
              </span>
              <span 
                onClick={(e) => this.switchCategory(e.target.innerText)} 
                className={this.state.selectedCategory === "Personal" ? "category-label selected" : "category-label"}
              >
                Personal
              </span>
              <span 
                onClick={(e) => this.switchCategory(e.target.innerText)} 
                className={this.state.selectedCategory === "News" ? "category-label selected" : "category-label"}
              >
                News
              </span>
              <span 
                onClick={(e) => this.switchCategory(e.target.innerText)} 
                className={this.state.selectedCategory === "Sports" ? "category-label selected" : "category-label"}
              >
                Sports
              </span>
              <span 
                onClick={(e) => this.switchCategory(e.target.innerText)} 
                className={this.state.selectedCategory === "Education" ? "category-label selected" : "category-label"}
              >
                Education
              </span>
              <span 
                onClick={(e) => this.switchCategory(e.target.innerText)} 
                className={this.state.selectedCategory === "Art" ? "category-label selected" : "category-label"}
              >
                Art
              </span>
              <span 
                onClick={(e) => this.switchCategory(e.target.innerText)} 
                className={this.state.selectedCategory === "Style" ? "category-label selected" : "category-label"}
              >
                Style
              </span>
              <span 
                onClick={(e) => this.switchCategory(e.target.innerText)} 
                className={this.state.selectedCategory === "Entertainment" ? "category-label selected" : "category-label"}
              >
                Entertainment
              </span>
            </div>
          </div>
          <div className="story-grid">
            {mappedStories}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {stories: state.previews.storiesDiscoverAll}
};

export default connect(mapStateToProps, {getStoriesDiscoverAll})(Discover);