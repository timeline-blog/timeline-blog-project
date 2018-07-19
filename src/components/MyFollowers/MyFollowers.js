import React, { Component } from "react";
import UserSummary from "./UserSummary";
import { connect } from "react-redux";
import {
  getFollowers,
  getFollowing,
  unfollow,
  addFollow
} from "../../ducks/reducers/followsReducer";
import { getLoggedInUser } from "../../ducks/reducers/userReducer";

class MyFollowers extends Component {
  constructor() {
    super();
    this.state = { 
      followersList: [], 
      followingList: [] 
    };

    this.handleAddFollow = this.handleAddFollow.bind(this);
    this.handleUnfollow = this.handleUnfollow.bind(this);
    this.updateFollowingList = this.updateFollowingList.bind(this);
    this.updateFollowersList = this.updateFollowersList.bind(this);
  }
  
  componentDidMount() {
    this.props.getFollowers(this.props.user.user_id)
      .then( () => this.updateFollowersList() )

    this.props.getFollowing(this.props.user.user_id)
      .then( () => this.updateFollowingList() )
  }

  updateFollowersList() {
    this.setState({ followersList: this.props.followers })
  }
  
  updateFollowingList() {
    this.setState({ followingList: this.props.following })
  }

  handleAddFollow(follower_id, following_id) {
    console.log( 'handle addFollow invoked')
    this.props.addFollow(follower_id, following_id)
      .then( () => {
        this.props.getFollowing(this.props.user.user_id).then( () => this.updateFollowingList() )
      } );
  }

  handleUnfollow(follower_id, following_id) {
    console.log('handle unfollow invoked')
    this.props.unfollow(follower_id, following_id)
      .then( () => {
        this.props.getFollowing(this.props.user.user_id).then( () => this.updateFollowingList() )
      } );
  }

  /**
   * Each user summary needs to know if logged in user follows the user being displayed:
   * 1. get logged in user_id
   * 2. get info for users following logged in user
   *    this.props.getFollowers( logged in user_id )
   * 3. since global "following" state is being mapped to props, we can use this.props.following to compare
   *    user_id of user being displayed with user_id of every user in this.props.following using filter;
   *    if the filtered array has a result, the UserSummary should take a prop indicating so (a boolean)
   * 4. UserSummary will need check the boolean to know whether to render "Follow" or "Unfollow"
   */

  render() {
    let followersList = this.state.followersList.map((follows, index) => {
      return (
        <UserSummary
          key={index}
          userid={follows.user_id}
          display_name={follows.display_name}
          avatar={follows.avatar}
          unfollow={this.handleUnfollow}
          addFollow={this.handleAddFollow}
          user_id={follows.user_id}
          followingList={this.state.followingList}
        />
      );
    });
    return (
      <div className="outer-wrap followers-wrap">
        <div className="inner-wrap">
          <div className="page-header followers-header">
            <h1 className="page-title">My Followers</h1>

            <input
              type="text"
              className="main-input"
              placeholder="Search users..."
            />
          </div>

          <div className="followers-list-wrap">
            <h3 className="followers-list-title">
              {this.props.followers.length} followers
            </h3>
          </div>
          {followersList}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    followers: state.follows.followers,
    following: state.follows.following,
    user: state.user.authedUser
  };
};
export default connect(
  mapStateToProps,
  { getFollowers, getFollowing, unfollow, addFollow }
)(MyFollowers);
