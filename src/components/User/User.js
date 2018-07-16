import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";

import { getStoriesByUser } from "../../ducks/reducers/previewsReducer";
import { getUserById } from '../../ducks/reducers/userReducer';

import StoryPreview from "../StoryPreview";

class User extends Component {
  componentDidMount() {
    this.props.getUserById(this.props.match.params.user_id)
    this.props.getStoriesByUser(this.props.match.params.user_id);
  };

  render() {
    console.log('Props!!!   ', this.props);

    const { display_name, bio, avatar, follower_count } = this.props.profileInfo
    const stories = _.map(this.props.stories);
    const mappedStories = stories.map(story => {

      return (
        <StoryPreview
          key={story[0].story_id}
          display_name={story[0].display_name}
          avatar={story[0].avatar}
          user_id={story[0].user_id}
          story_title={story[0].story_title}
          story_category={story[0].story_category}
          like_count={story[0].like_count}
          story_id={story[0].story_id}
          event_title={story[1] ? story[1].event_title : "No events"}
          e_created_on={story[1] ? story[1].e_created_on : null}
          event_id={story[1] ? story[1].event_id : null}
          url={story[2] ? story[2].url : "No image"}
        />
      );
    });

    return (
      <div className="outer-wrap profile-wrap">
        <div className="inner-wrap">
          <div className="page-header profile-header">
            <img className="profile-avatar" src={avatar} alt="" />
            <h1 className="page-title profile-title">{display_name}</h1>
            <p className="page-description profile-description">
              {bio}
            </p>
            <div className="follow-info-wrap">
              <button className="follow-btn btn">Follow</button>
              <span className="follow-count">{follower_count}</span>
            </div>
          </div>

          <div className="story-grid">{mappedStories}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { 
    stories: state.previews.storiesByUser,
    user: state.user.authedUser,
    profileInfo: state.user.profileUser 
  };
};

export default connect(
  mapStateToProps,
  { getStoriesByUser, getUserById }
)(User);
