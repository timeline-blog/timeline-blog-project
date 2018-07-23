import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { getStoriesByUser } from "../../ducks/reducers/previewsReducer";
import { getUserById } from '../../ducks/reducers/userReducer';
import { followCheck, getFollowerCount, addFollow, unfollow } from '../../ducks/reducers/followsReducer';

import StoryPreview from "../StoryPreview";
import EditProfileModal from './EditProfileModal';

class User extends Component {

  constructor() {
    super();
    this.state = {
      modalMode: "hidden",
      displayName: '',
      bio: '',
      avatarUrl: ''
    }
    this.toggleEditProfileModal = this.toggleEditProfileModal.bind(this);
    this.followHandler = this.followHandler.bind(this);
    this.unfollowHandler = this.unfollowHandler.bind(this);
    this.saveUserEdit = this.saveUserEdit.bind(this);
  }

  componentDidMount() {
    this.props.getFollowerCount(this.props.match.params.user_id);
    this.props.getUserById(this.props.match.params.user_id)
    .then(response => {
      console.log('response: ', response);
      let {display_name, bio, avatar} = response.value.data[0]
      this.setState({
        displayName: display_name,
        bio: bio,
        avatarUrl: avatar
      })
    })
      .then(() => this.props.followCheck(this.props.user.user_id, this.props.match.params.user_id));
    this.props.getStoriesByUser(this.props.match.params.user_id);
  };

  componentDidUpdate(prevProps) {

    if(this.props.match.params.user_id !== prevProps.match.params.user_id){
      this.props.getFollowerCount(this.props.match.params.user_id);
      this.props.getUserById(this.props.match.params.user_id);
      this.props.getStoriesByUser(this.props.match.params.user_id);
      this.props.followCheck(this.props.user.user_id, this.props.match.params.user_id);
    }
  };

  toggleEditProfileModal() {
    if (this.state.modalMode === "hidden") {
      this.setState({ modalMode: "visible" });
    } else {
      this.setState({ modalMode: "hidden" });
    } 
  };

  followHandler() {
    this.props.addFollow(this.props.user.user_id, this.props.match.params.user_id)
      .then(() => this.props.followCheck(this.props.user.user_id, this.props.match.params.user_id))
      .then(() => this.props.getFollowerCount(this.props.match.params.user_id));
  };

  unfollowHandler() {
    this.props.unfollow(this.props.user.user_id, this.props.match.params.user_id)
    .then(() => this.props.followCheck(this.props.user.user_id, this.props.match.params.user_id))
    .then(() => this.props.getFollowerCount(this.props.match.params.user_id));
  }

  saveUserEdit(newDisplayName, newBio, newAvatar) {
    this.setState({
      displayName: newDisplayName,
      bio: newBio,
      avatarUrl: newAvatar
    })
  };

  render() {
    // console.log('State!!!   ', this.state);

    const { display_name, bio, avatar } = this.props.profileInfo
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
            <img className="profile-avatar" src={this.state.avatarUrl} alt={this.state.displayName} />
            <h1 className="page-title profile-title">{this.state.displayName}</h1>
            <p className="page-description profile-description">
              {this.state.bio}
            </p>
            {(this.props.user.user_id == this.props.match.params.user_id) ?
              <button onClick={() => this.toggleEditProfileModal()} className="btn"> + Edit Profile</button>
              : null}
            {(this.props.user.user_id == this.props.match.params.user_id) ? 
                <div className="follow-info-wrap">
                  <span className="follow-btn btn">Followers</span>
                  <span className="follow-count">{this.props.followerCount}</span>
                </div>
            : (this.props.user.user_id && !this.props.followingCheck) ? 
              <div className="follow-info-wrap">
                <button className="follow-btn btn" onClick={() => this.followHandler()}>Follow</button>
                <span className="follow-count">{this.props.followerCount}</span>
              </div>
            : (this.props.user.user_id && this.props.followingCheck) ? 
              <div className="follow-info-wrap">
                <button className="btn border-btn negative-border-btn" onClick={() => this.unfollowHandler()}>Unfollow</button>
                <span className="follow-count">{this.props.followerCount}</span>
              </div>
            : (!this.props.user.user_id) ? 
              <div className="follow-info-wrap">
                <span className="follow-btn btn">Followers</span>
                <span className="follow-count">{this.props.followerCount}</span>
              </div>
            : null}
          </div>

          <div className="story-grid">{mappedStories}</div>
          <EditProfileModal 
            modalMode={this.state.modalMode} 
            toggleModal={this.toggleEditProfileModal} 
            saveUserEdit={this.saveUserEdit}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { 
    stories: state.previews.storiesByUser,
    user: state.user.authedUser,
    profileInfo: state.user.profileUser,
    followingCheck: state.follows.followCheck,
    followerCount: state.follows.followerCount
  };
};

export default connect(
  mapStateToProps,
  { getStoriesByUser, getUserById, followCheck, getFollowerCount, addFollow, unfollow }
)(User);
