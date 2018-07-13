import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import _ from 'lodash';

import { getStoriesByUser } from '../../ducks/reducers/previewsReducer';

import StoryPreview from '../StoryPreview';

class User extends Component {

  componentDidMount() {
    this.props.getStoriesByUser(1);
  }

  render() {

    const stories = _.map(this.props.stories)
    const mappedStories = stories.map(story => {
      // console.log(story);
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
            {mappedStories}
          </div>
        </div>  
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {stories: state.previews.storiesByUser}
};

export default connect(mapStateToProps, {getStoriesByUser})(User);