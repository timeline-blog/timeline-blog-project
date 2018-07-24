import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import _ from 'lodash';

import { getStoriesByFollowing } from '../../ducks/reducers/previewsReducer';
import { getLoggedInUser } from '../../ducks/reducers/userReducer';

import StoryPreview from "../StoryPreview";

class LikedStories extends Component {

  componentDidMount() {
    this.props.getLoggedInUser().then( () => this.props.getStoriesByFollowing(this.props.user.user_id) );
  }

  render() {
    //console.log(this.props);

    const stories = _.map(this.props.stories)
    const mappedStories = stories.map(story => {
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

          url = {story[1] ? (story[1].e_urls ? story[1].e_urls : 'No image' ) : 'No image'}
        />
      )
    })
    
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
            {mappedStories}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    stories: state.previews.storiesByFollowing,
    user: state.user.authedUser
  }
};

export default connect(mapStateToProps, {getStoriesByFollowing, getLoggedInUser})(LikedStories);
